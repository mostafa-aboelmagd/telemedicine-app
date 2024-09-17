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
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name
    FROM users U
    WHERE U.user_id = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
        if (result.rows.length) {
            console.log('Patient found', result.rows);
            return result.rows;
        }
    console.log('Patient info not found');
    return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrieveDoctor = async (id) => {
    try {
        const query = 
        `SELECT 
        U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name
        FROM users U
        WHERE U.user_id = $1 AND U.user_role = $2`;
    
        const result = await pool.query(query, [id, 'Doctor']);
        if (result.rows.length) {
            console.log('Doctor found', result.rows);
            return result.rows;
        }
        console.log('Doctor not found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const checkAppointmentAvailability = async (doctorId, doctorAvailabilitySlot) => {
    try {
        const result = await pool.query(
            'SELECT * FROM appointment WHERE appointment_doctor_id = $1 AND appointment_availability_slot = $2 AND appointment_status = $3',
            [doctorId, doctorAvailabilitySlot, "scheduled"]
        );
        if (result.rows.length) {
            console.log('Doctor already have an appointment at this time', result.rows);
            return result.rows;
        }
        console.log('Doctor is available at this time');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAppointment = async (patientId, doctorId, appointmentType, appointmentDuration, doctorAvailabilitySlot) => {
    try {
        const result = await pool.query(
            'INSERT INTO appointment(appointment_patient_id, appointment_doctor_id, appointment_status, appointment_type, appointment_duration, appointment_availability_slot) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [patientId, doctorId, "scheduled", appointmentType, appointmentDuration, doctorAvailabilitySlot]
        );
        if (result.rows.length) {
            console.log('Appointment added successfully', result.rows);
            return result.rows;
        }
        console.log('Could not add appointment');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};



module.exports = { retrievePatient, retrieveDoctor, checkAppointmentAvailability, insertAppointment };