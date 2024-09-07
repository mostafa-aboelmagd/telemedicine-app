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

const retrievePatientInfo = async (id) => {
    try {
        const query = 
        `SELECT 
        P.*,
        U.email, U.phone_number, U.gender, U.birth_year, U.first_name, U.last_name,
        U2.email, U.phone_number, U.gender, U.birth_year, U.first_name, U.last_name,
        A.*,
        D.*,
        R.*,
        AR.*
        FROM patients P
        LEFT JOIN users U ON P.patient_id = U.user_id AND U.role = 'Patient'
        LEFT JOIN appointment A ON P.patient_id = A.patient_id
        LEFT JOIN doctors D ON P.current_doctor_id = D.doctor_id
        LEFT JOIN reviews R ON P.patient_id = R.patient_id
        LEFT JOIN appointment_review AR ON A.appointment_id = AR.appointment_id_review
        LEFT JOIN users U2 ON P.current_doctor_id = U2.user_id
        WHERE P.patient_id = $1`;

    const result = await pool.query(query, [id]);
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