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

const retrieveDoctor = async (id, email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1 AND user_email = $2 AND user_role = $3', [id, email, 'Doctor']);
        if (result.rows.length) {
            console.log('Doctor already exists', result.rows);
            return result.rows;
        }
        console.log('No doctor found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAppointment = async (doctorId, slot) => {
    try {
        const result = await pool.query(
            'INSERT INTO appointment(appointment_doctor_id, appointment_status, appointment_availability_slot) VALUES($1, $2, $3) RETURNING *',
            [doctorId, "unbooked", slot]
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

module.exports = { retrieveDoctor, insertAppointment };