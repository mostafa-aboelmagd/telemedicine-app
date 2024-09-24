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

const checkDoctorAvailability = async (doctorId, availabilityDayHour) => {
    try {
        const result = await pool.query(
            'SELECT * FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_day_hour = $2 AND doctor_availability_status = $3',
            [doctorId, availabilityDayHour, true]
        );
        if (result.rows.length) {
            console.log('Doctor availability already exists', result.rows);
            return false;
        }
        console.log('Doctor is available at this time');
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertDoctorAvailability = async (doctorId, doctorAvailabilityDayHour, doctorAvailabilityType, additionalData = {}) => {
    try {
      const result = await pool.query(
        'INSERT INTO doctor_availability(doctor_availability_doctor_id, doctor_availability_type, doctor_availability_status, doctor_availability_day_hour) VALUES($1, $2, $3, $4) RETURNING *',
        [doctorId, doctorAvailabilityType, 'Available', doctorAvailabilityDayHour, ...Object.values(additionalData)] // Construct additional values
      );
      if (result.rows.length) {
        return result.rows[0]; // Return the inserted row
      }
      return false;
    } catch (error) {
      console.error('Error inserting doctor availability:', error);
      return false;
    }
  };

module.exports = { checkDoctorAvailability, insertDoctorAvailability};