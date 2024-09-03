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
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1 AND user_role = $2', [email, 'Patient']);
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

const updateInfo = async (patienId, patientEmail, updates) => {
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

        values.push(patienId, 'Patient', patientEmail);
        const query = `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${index} AND user_role = $${index + 1} AND user_email = $${index + 2} RETURNING *`;
        const result = await pool.query(query, values);

        if (result.rows.length) {
            console.log('Patient info updated', result.rows);
            return result.rows;
        }
        console.log('Could not update patient info');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const updatePassword = async (patientId, patientEmail, oldPassword, newPassword) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1 AND user_role = $2 AND user_email = $3', [patientId, 'Patient', patientEmail]);
        if (result.rows.length) {
            const isMatch = await bcrypt.compare(oldPassword, result.rows[0].user_password_hash);
            if (isMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                const result = await pool.query('UPDATE users SET user_password_hash = $1 WHERE user_id = $2 AND user_role = $3 AND user_email = $4 RETURNING *', [hashedPassword, patientId, 'Patient', patientEmail]);
                if (result.rows.length) {
                    console.log('Patient password updated', result.rows);
                    return result.rows;
                }
                console.log('Could not update patient password');
                return false;
            }
            console.log('Old password does not match');
            return false;
        }
        console.log('Patient not found');
        return false;
    }
    catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { updateInfo, updatePassword, checkUserEmail };

