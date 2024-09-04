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

const checkDoctorAvailability = async (doctorId, availabilityDay, availabilityHour) => {
    try {
        const result = await pool.query('SELECT * FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_day = $2 AND doctor_availability_hour = $3 AND doctor_availability_status = $4', [doctorId, availabilityDay, availabilityHour, true]);
        if (result.rows.length) {
            console.log('Doctor availability already exists', result.rows);
            return result.rows;
        }
        console.log('No doctor availability found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAvailability = async (doctorId, availabilityDay, availabilityHour) => {
    try {
        const result = await pool.query(
            'INSERT INTO doctor_availability(doctor_availability_doctor_id, doctor_availability_day, doctor_availability_hour, doctor_availability_status) VALUES($1, $2, $3, $4) RETURNING *',
            [doctorId, availabilityDay, availabilityHour, true]
        );
        if (result.rows.length) {
            console.log('Doctor availability added successfully', result.rows);
            return result.rows;
        }
        console.log('Could not add doctor availability');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { checkDoctorAvailability, insertAvailability };