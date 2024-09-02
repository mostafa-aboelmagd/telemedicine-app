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

const retrievePatient = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, 'Patient']);
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
    let databaseUser = await retrievePatient(user.email);
    if (databaseUser) {
        return false;
    } try {
        await pool.query(
            'INSERT INTO users(first_name, last_name, email, phone_number, gender, role, password_hash, birth_year) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            [user.fName, user.lName, user.email, user.phone, user.gender, user.role, user.password, user.birthYear]
        );
        databaseUser = await retrievePatient(user.email);
        if (databaseUser) {
            console.log('User added successfully');
            return databaseUser;
        }
        console.log('User not added');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = {insertPatient};