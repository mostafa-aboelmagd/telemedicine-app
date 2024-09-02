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


const retrieveDoctorInfo = async (id) => {
    try {
        const query = 
        `SELECT *
        FROM doctors D
        LEFT JOIN users U ON D.doctor_id = U.user_id
        LEFT JOIN doctor_availability DA ON D.doctor_id = DA.doctor_id
        LEFT JOIN doctor_experience DE ON D.doctor_id = DE.doctor_id
        LEFT JOIN doctor_interest DI ON D.doctor_id = DI.doctor_id
        LEFT JOIN appointment A ON D.doctor_id = A.doctor_id
        LEFT JOIN education E ON D.doctor_id = E.doctor_id
        LEFT JOIN patients P ON D.doctor_id = P.current_doctor_id
        LEFT JOIN reviews R ON D.doctor_id = R.doctor_id
        WHERE D.doctor_id = $1 AND U.role = $2`;

    const result = await pool.query(query, [id, 'Doctor']);
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


