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

const getDoctorFromAvailability = async (availabilityId) => {
    try {
      const result = await pool.query(
        'SELECT doctor_availability_doctor_id FROM doctor_availability WHERE doctor_availability_id = $1',
        [availabilityId]
      );
  
      if (result.rows.length) {
        return result.rows[0].doctor_availability_doctor_id;
      }
  
      return null;
    } catch (error) {
      console.error(error.stack);
      return null;
    }
  };
  
  const createAppointment = async (patientId, doctorId, appointmentDuration, availabilityId) => {
    try {
      const result = await pool.query(
        'INSERT INTO appointment (appointment_patient_id, appointment_doctor_id, appointment_duration, appointment_availability_slot) VALUES ($1, $2, $3, $4) RETURNING *',
        [patientId, doctorId, appointmentDuration, availabilityId]
      );
  
      if (result.rows.length) {
        return result.rows[0];
      }
  
      return null;
    } catch (error) {
      console.error(error.stack);
      return null;
    }
  };
  
  module.exports = { getDoctorFromAvailability, createAppointment };