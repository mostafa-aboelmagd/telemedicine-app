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

const getUnreadNotifications = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM notifications WHERE user_id = $1 AND read = FALSE',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error(error.stack);
        throw error; // Re-throw the error to be handled by the controller
    }
};


const getNotifications = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM notifications WHERE user_id = $1',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error(error.stack);
        throw error; 
    }
};
const markNotificationsAsRead = async (notificationIds) => {
    try {
        const query = 'UPDATE notifications SET read = TRUE WHERE notification_id = ANY($1)';
        await pool.query(query, [notificationIds]);
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
};
module.exports = { getUnreadNotifications, getNotifications, markNotificationsAsRead };