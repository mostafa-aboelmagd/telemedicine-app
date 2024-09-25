const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPORT } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = new pg.Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: {
        rejectUnauthorized: true,
    },
});

(async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();



const getDoctorTimeslots = async (doctorId) => {
    try {
      const result = await pool.query(
        `SELECT timeslot_code, timeslot_type
         FROM timeslots WHERE timeslot_doctor_id = $1`,
        [doctorId]
      );
  
      const timeslotCodes = result.rows.map(row => `${row.timeslot_code}_${row.timeslot_type}`);
      return timeslotCodes.join(',');
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  const getDoctorAvailabilityDetails = async (doctorId, timeslots) => {
    try {
      const availability = [];
      for (const timeslot of timeslots) {
        const slotCode = `${timeslot.timeslot_code}_${timeslot.timeslot_type}`;
        const result = await pool.query(
          `SELECT doctor_availability_day_hour
           FROM doctor_availability
           WHERE doctor_availability_doctor_id = $1
           AND time_slot_code = $2`,
          [doctorId, slotCode]
        );

        if (result.rows.length > 0) {
          availability.push(result.rows[0].doctor_availability_day_hour);
        }
      }
      return availability.filter(item => item !== null);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

module.exports = { getDoctorAvailabilityDetails,getDoctorTimeslots};