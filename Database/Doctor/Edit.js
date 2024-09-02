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

const updateDoctorInfo = async (doctorId, updates) => {
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

        values.push(doctorId, 'Doctor');
        const query = `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${index} AND role = $${index + 1} RETURNING *`;
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

const updateDoctorPassword = async (doctorId, oldPassword, newPassword) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1 AND role = $2', [doctorId, 'Doctor']);
        if (result.rows.length) {
            const isMatch = await bcrypt.compare(oldPassword, result.rows[0].password_hash);
            if (isMatch) {
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                const result = await pool.query('UPDATE users SET password_hash = $1 WHERE user_id = $2 AND role = $3 RETURNING *', [hashedPassword, doctorId, 'Doctor']);
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
        console.log('Could not update doctor password');
        return false;
    }
    catch (error) {
        console.error(error.stack);
        return false;
    }
};


const updateDoctorAvailability = async (doctorId, availability, status) => {
    try {
        const doctorUserId = await pool.query('SELECT doctor_id FROM doctors WHERE user_id = $1', [doctorId]);
        if (doctorUserId.rows.length) {
            doctorId = doctorUserId.rows[0].doctor_id;
            const result = await pool.query('UPDATE doctor_availability SET date_time = $1, status = $2 WHERE doctor_id = $3 RETURNING *', [availability, status, doctorId]);
            if (result.rows.length) {
                console.log('Doctor availability updated', result.rows);
                return result.rows;
            }
            console.log('Could not update doctor availability');
            return false;
        }
        console.log('Doctor user id not found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};


module.exports = { updateDoctorInfo, updateDoctorPassword, updateDoctorAvailability };

