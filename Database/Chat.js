const pg = require('pg');

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
        console.log('Connected to the database from chat server');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();


const insertMessage = async (senderId, receiverId, message, appointmentId) => {
    try {
        const result = await pool.query(
            'INSERT INTO message (message_sender_id, message_receiver_id, message_content, message_appointment_id, message_date) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [senderId, receiverId, message, appointmentId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error sending message:', error);
        return false;
    }
};

const getChatMessages = async (appointmentId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM message WHERE message_appointment_id = $1 ORDER BY message_date ASC',
            [appointmentId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error retrieving chat messages:', error);
        return false;
    }
};

module.exports = { insertMessage, getChatMessages };