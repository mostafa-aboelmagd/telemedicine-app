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


const getDoctorIdFromSlot = async (appointmentAvailabilitySlot) => {
  try {
    const client = await pool.connect();

    const result = await client.query(
      `SELECT doctor_availability_doctor_id FROM doctor_availability WHERE doctor_availability_id = $1`,
      [appointmentAvailabilitySlot]
    );

    client.release();

    if (result.rows.length > 0) {
      return result.rows[0].doctor_availability_doctor_id;
    }

    return null;
  } catch (error) {
    console.error('Error getting doctor ID from slot:', error);
    throw error; // Re-throw for handling in controller
  }
};

const createAppointment = async (patientId, doctorId, appointmentAvailabilitySlot, complaint, duration, appointmentSettingsType, appointmentType, appointmentParentReference) => {
  try {
    const client = await pool.connect();

    const result = await client.query(
      `INSERT INTO appointment (
        appointment_patient_id,
        appointment_doctor_id,
        appointment_availability_slot,
        appointment_complaint,
        appointment_duration,
        appointment_settings_type,
        appointment_type,
        appointment_parent_reference
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [patientId, doctorId, appointmentAvailabilitySlot, complaint, duration, appointmentSettingsType, appointmentType, appointmentParentReference]
    );

    client.release();

    return result;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error; // Re-throw for handling in controller
  }
};
  
  module.exports = { getDoctorIdFromSlot, createAppointment };
