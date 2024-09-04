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

const retrievePatient = async (email) => {
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




const insertPatient = async (user) => {
    const databaseUser = await retrievePatient(user.email);
    if (databaseUser) {
        return false;
    } try {
        const User = await pool.query(
            'INSERT INTO users(user_first_name, user_last_name, user_email, user_phone_number, user_gender, user_role, user_password_hash, user_birth_year) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [user.fName, user.lName, user.email, user.phone, user.gender, user.role, user.password, user.birthYear]
        );
        if (User.rows.length) {
            console.log('User added successfully', User.rows);
            const Patient = await pool.query(`INSERT INTO patient(patient_user_id_reference, patient_wallet) VALUES($1, $2) RETURNING *`, [User.rows[0].user_id, 0]);
            if (Patient.rows.length) {
                console.log('Patient added successfully', Patient.rows);
                return [User.rows, Patient.rows];
            }
            console.log('Patient not added');
            return false;
        }
        console.log('User not added');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = {insertPatient};