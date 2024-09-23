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

const getDoctorFromAvailability = async (doctor_availability_id) => {
    try {
      const result = await pool.query(
        'SELECT doctor_availability_doctor_id FROM doctor_availability WHERE doctor_availability_id = $1',
        [doctor_availability_id]
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

  const retrievePatient = async (id, email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_role = $2 AND user_id = $3', [email, 'Patient', id]);
        if (result.rows.length) {
            console.log('User already exists', result.rows);
            return result.rows;
        }
        console.log('No user found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};
// Not tested yet

const createAppointment = async (appointmentData) => {
  const {
    patientId, 
    appointment_doctor_id,
    availabilitySlot,
    appointmentType,
    appointmentDuration,
    appointment_complaint,
    appointmentStatus = 'Pending'
  } = appointmentData;

  console.log( 
    patientId,
    appointment_doctor_id,
    availabilitySlot,
    appointmentType,
    appointmentDuration,
    appointment_complaint
  );
  
  try {
      const result = await pool.query(
          'INSERT INTO appointment (appointment_patient_id, appointment_doctor_id, appointment_availability_slot, appointment_type, appointment_duration, appointment_complaint, appointment_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [patientId, appointment_doctor_id, availabilitySlot, appointmentType, appointmentDuration, appointment_complaint, appointmentStatus]
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



  module.exports = { getDoctorFromAvailability, createAppointment, retrievePatient};