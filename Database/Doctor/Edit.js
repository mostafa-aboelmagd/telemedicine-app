const pg = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 15;


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

const checkUserEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_role = $2', [email, 'Doctor']);
        if (result.rows.length) {
            console.log('User already exists', result.rows);
            return result.rows;
        }
        console.log('No user found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const updateInfo = async (doctorId, doctorEmail, updates) => {
    try {
        const fields = [];
        const values = [];
        let index = 1;

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && value !== null && value !== '') {
                fields.push(`${key} = $${index}`);
                values.push(value);
                index++;
            }
        }

        if (fields.length === 0) {
            console.log('No fields to update');
            return false;
        }

        values.push(doctorId, 'Doctor', doctorEmail);
        const query = `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${index} AND user_role = $${index + 1} AND user_email = $${index + 2} RETURNING *`;
        const result = await pool.query(query, values);

        if (result.rows.length) {
            console.log('Doctor info updated', result.rows);
            return result.rows;
        }
        console.log('Could not update doctor info');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const updatePassword = async (doctorId, doctorEmail, oldPassword, newPassword) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1 AND user_email = $2 AND user_role = $3', [doctorId, doctorEmail, 'Doctor']);
        if (result.rows.length) {
            const isMatch = await bcrypt.compare(oldPassword, result.rows[0].user_password_hash);
            if (isMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                const result = await pool.query('UPDATE users SET user_password_hash = $1 WHERE user_id = $2 AND user_email = $3 AND user_role = $4 RETURNING *', [hashedPassword, doctorId, doctorEmail, 'Doctor']);
                if (result.rows.length) {
                    console.log('Doctor password updated', result.rows);
                    return result.rows;
                }
                console.log('Could not update doctor password');
                return false;
            }
            console.log('Old password does not match');
            return false;
        }
        console.log('Doctor not found');
        return false;
    }
    catch (error) {
        console.error(error.stack);
        return false;
    }
};


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


module.exports = { updateInfo, updatePassword, updateAvailability, checkUserEmail };

