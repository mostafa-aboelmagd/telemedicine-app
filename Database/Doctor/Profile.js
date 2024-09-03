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


const retrieveDoctorInfo = async (id, email) => {
    try {
        const query = 
        `SELECT *
        FROM doctor D
        LEFT JOIN users U ON D.doctor_user_id_reference = U.user_id
        LEFT JOIN doctor_availability DA ON D.doctor_user_id_reference = DA.doctor_availability_doctor_id
        LEFT JOIN doctor_experience DEX ON D.doctor_user_id_reference = DEX.doctor_experience_doctor_id
        LEFT JOIN doctor_interest DI ON D.doctor_user_id_reference = DI.doctor_interest_doctor_id
        LEFT JOIN doctor_education DED ON D.doctor_user_id_reference = DED.education_doctor_id
        LEFT JOIN appointment A ON D.doctor_user_id_reference = A.appointment_doctor_id
        LEFT JOIN patient P ON D.doctor_user_id_reference = P.patient_current_doctor_id
        LEFT JOIN review R ON D.doctor_user_id_reference = R.review_doctor_id
        WHERE D.doctor_user_id_reference = $1 AND U.user_role = $2 AND U.user_email = $3`;

    const result = await pool.query(query, [id, 'Doctor', email]);
        if (result.rows.length) {
            console.log('Doctor info found', result.rows);
            return result.rows[0];
        }

        console.log('Doctor info not found');
        return false;

    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { retrieveDoctorInfo };


