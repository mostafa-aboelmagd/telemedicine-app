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

const retrievePatientInfo = async (id, email) => {
    try {
    const query = 
    `SELECT 
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
    array_agg(L.language) AS languages
    FROM users U
    LEFT JOIN languages L ON u.user_id = L.lang_user_id
    WHERE U.user_id = $1 AND U.user_email = $2 AND U.user_role = $3
    GROUP BY U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name`;

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

const retrievePatientAppointments = async (id, email) => {
    try {
    const query = 
    `SELECT 
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
    P.*,
    A.*
    FROM patient P
    LEFT JOIN users U ON P.patient_user_id_reference = U.user_id
    LEFT JOIN appointment A ON P.patient_user_id_reference = A.appointment_patient_id
    WHERE P.patient_user_id_reference = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
    if (result.rows.length) {
        console.log('Patient appointments found', result.rows);
        return result.rows;
    }
    console.log('Patient info not found');
    return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrievePatientDoctors = async (id, email) => {
    try {
    const query = 
    `SELECT 
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
    P.*,
    D.*
    FROM patient P
    LEFT JOIN users U ON P.patient_user_id_reference = U.user_id
    LEFT JOIN doctor D ON P.patient_current_doctor_id = D.doctor_user_id_reference
    WHERE P.patient_user_id_reference = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
    if (result.rows.length) {
        console.log('Patient doctors found', result.rows);
        return result.rows;
    }
    console.log('Patient doctors not found');
    return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrievePatientReviews = async (id, email) => {
    try {
    const query = 
    `SELECT 
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
    P.*,
    R.*
    FROM patient P
    LEFT JOIN users U ON P.patient_user_id_reference = U.user_id
    LEFT JOIN review R ON P.patient_user_id_reference = R.review_patient_id
    WHERE P.patient_user_id_reference = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
    if (result.rows.length) {
        console.log('Patient reviews found', result.rows);
        return result.rows;
    }
    console.log('Patient reviews not found');
    return false;
    }
    catch (error) {
        console.error(error.stack);
        return false;
    }
};

const retrievePatientLanguages = async (id, email) => {
    try {
    const query = 
    `SELECT 
    U.user_email, U.user_phone_number, U.user_gender, U.user_birth_year, U.user_first_name, U.user_last_name,
    P.*,
    L.*
    FROM patient P
    LEFT JOIN users U ON P.patient_user_id_reference = U.user_id
    LEFT JOIN languages L ON P.patient_user_id_reference = L.lang_user_id
    WHERE P.patient_user_id_reference = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
    if (result.rows.length) {
        console.log('Patient languages found', result.rows);
        return result.rows;
    }
    console.log('Patient languages not found');
    return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { retrievePatientInfo, retrievePatientAppointments, retrievePatientDoctors, retrievePatientReviews, retrievePatientLanguages };