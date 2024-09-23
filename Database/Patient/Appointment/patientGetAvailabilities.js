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



const retrieveDoctorAvailabilities = async (doctorId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_status = $2',
            [doctorId, 'Available']
        );
        if (result.rows.length) {
            console.log('Doctor availabilities retrieved successfully', result.rows);
            return result.rows;
        }
        console.log('Could not retrieve doctor availabilities');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};



module.exports = { retrieveDoctorAvailabilities};