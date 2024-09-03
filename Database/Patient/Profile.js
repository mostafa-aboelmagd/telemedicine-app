const pg = require('pg');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER } = process.env;
let PGPASSWORD = process.env.PGPASSWORD;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const pool = new pg.Pool({
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: 5432,
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
        P.*,
        U.user_email AS patient_email, U.user_phone_number AS patient_phone_number, U.user_gender AS patient_gender, U.user_birth_year AS patient_birth_year, U.user_first_name AS patient_first_name, U.user_last_name AS patient_last_name,
        U2.user_email AS doctor_email, U2.user_phone_number AS doctor_phone_number, U2.user_gender AS doctor_gender, U2.user_birth_year AS doctor_birth_year, U2.user_first_name AS doctor_first_name, U2.user_last_name AS doctor_last_name,
        A.*,
        D.*
        FROM patient P
        LEFT JOIN users U ON P.patient_user_id_reference = U.user_id
        LEFT JOIN appointment A ON P.patient_user_id_reference = A.appointment_patient_id
        LEFT JOIN doctor D ON P.patient_current_doctor_id = D.doctor_user_id_reference
        LEFT JOIN users U2 ON P.patient_current_doctor_id = U2.user_id
        WHERE P.patient_user_id_reference = $1 AND U.user_email = $2 AND U.user_role = $3`;

    const result = await pool.query(query, [id, email, 'Patient']);
        if (result.rows.length) {
            console.log('Patient info found', result.rows);
            return result.rows[0];
        }

        console.log('Patient info not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { retrievePatientInfo };