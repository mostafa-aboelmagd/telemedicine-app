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

const retrieveUser = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        if (result.rows.length) {
            console.log('User already exists', result.rows);
            return result.rows;
        }
        console.log('User not found');
        return false;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

module.exports = { retrieveUser };