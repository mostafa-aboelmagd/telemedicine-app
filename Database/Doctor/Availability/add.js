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

const checkDoctorAvailability = async (doctorId, availabilityDayHour) => {
    try {
        const result = await pool.query(
            'SELECT * FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_day_hour = $2 AND doctor_availability_status = $3',
            [doctorId, availabilityDayHour, true]
        );
        if (result.rows.length) {
            console.log('Doctor availability already exists', result.rows);
            return false;
        }
        console.log('Doctor is available at this time');
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const insertAvailability = async (doctorId, availabilityDayHour) => {
    try {
        const result = await pool.query(
            'INSERT INTO doctor_availability(doctor_availability_doctor_id, doctor_availability_day_hour, doctor_availability_status) VALUES($1, $2, $3) RETURNING *',
            [doctorId, availabilityDayHour, true]
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

const retrieveAllAvailabilities = async (doctorId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_status = $2',
            [doctorId, true]
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

module.exports = { checkDoctorAvailability, insertAvailability, retrieveAllAvailabilities };