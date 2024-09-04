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

const retrievePatient = async (id, email) => {
    try {
    const query = 
    `SELECT 
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
    P.*
    FROM patient P
    LEFT JOIN users U ON P.patient_user_id_reference = U.user_id
    WHERE P.patient_user_id_reference = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
        if (result.rows.length) {
            console.log('Patient info found', result.rows);
            return result.rows;
        }
    console.log('Patient info not found');
    return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const updateAppointment = async (patientId, patientAppointmentType, patientAppointmentDuration, availabilitySlot, doctorId) => {
    try {
        const result = await pool.query(
            'UPDATE appointment SET appointment_patient_id = $1, appointment_type = $2, appointment_duration = $3, appointment_status = $5 WHERE appointment_availability_slot = $4 AND appointment_doctor_id = $6 RETURNING *',
            [patientId, patientAppointmentType, patientAppointmentDuration, availabilitySlot, 'scheduled', doctorId]
        );
        if (result.rows.length) {
            console.log('Appointment is updated successfully', result.rows);
            return result.rows;
        }
        console.log('Could not update appointment');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { retrievePatient, updateAppointment };