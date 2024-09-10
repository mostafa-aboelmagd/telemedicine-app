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

// teste
(async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to the database prescription3');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();

const retrievePrescription = async (prescriptionId) => {
  try {
    const query = `
      SELECT * 
      FROM prescription_medications
      WHERE prescription_medication_id = 1`;
    const result = await pool.query(query, [prescriptionId]);
    if (result.rows.length) {
      return result.rows;
    }
    return false;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

module.exports = { retrievePrescription};