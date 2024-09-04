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

const checkDoctorAvailability = async (doctorId, availabilityDay, availabilityHour, availabilityId) => {
    try {
        const result = await pool.query('SELECT * FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_day = $2 AND doctor_availability_hour = $3 AND doctor_availability_status = $4 AND doctor_availability_id = $5', [doctorId, availabilityDay, availabilityHour, true, availabilityId]);
        if (result.rows.length) {
            console.log('Doctor availability is available', result.rows);
            return result.rows;
        }
        console.log('Doctor availability is already not available');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const deleteAvailability = async (doctorId, availabilityDay, availabilityHour, availabilityId) => {
    try {
        const result = await pool.query('DELETE FROM doctor_availability WHERE doctor_availability_doctor_id = $1 AND doctor_availability_day = $2 AND doctor_availability_hour = $3 AND doctor_availability_status = $4 AND doctor_availability_id = $5 RETURNING *',
             [doctorId, availabilityDay, availabilityHour, true, availabilityId]
        );
        if (result.rows.length) {
            console.log('Doctor availability deleted successfully', result.rows);
            return result.rows;
        }
        console.log('Could not delete doctor availability');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { checkDoctorAvailability, deleteAvailability };