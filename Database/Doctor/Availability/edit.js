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

const updateAvailability = async (doctorId, availabilityDay, availabilityHour, availabilityId) => {
    try {
        const doctor = await pool.query('SELECT * FROM doctor WHERE doctor_user_id_reference = $1', [doctorId]);
        if (doctor.rows.length) {
            const result = await pool.query('UPDATE doctor_availability SET doctor_availability_day = $1, doctor_availability_hour = $2 WHERE doctor_availability_doctor_id = $3 AND doctor_availability_id = $4 RETURNING *', [availabilityDay, availabilityHour, doctor.rows[0].doctor_user_id_reference, availabilityId]);
            if (result.rows.length) {
                console.log('Doctor availability updated', result.rows);
                return result.rows;
            }
            console.log('Doctor availability does not exist');
            return false;
        }
        console.log('Doctor user id not found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { updateAvailability };