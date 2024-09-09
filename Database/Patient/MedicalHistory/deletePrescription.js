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
        console.log('Connected to the database prescription2');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();
// Request Body format
// {
//   "medicationData": [
//     {
//       "medicationName": "Ibuprofen",
//       "dosage": "200mg, twice daily",
//       "note": "For pain relief"
//     },
//     {
//       "medicationName": "Paracetamol",
//       "dosage": "500mg, every 4 hours",
//       "note": "For fever reduction"
//     }
//   ]
// }


const deletePrescription = async (prescriptionId) => {
  try {
    const deletePrescriptionQuery = `
      DELETE FROM prescriptions
      WHERE
        prescription_id = $1
    `;
    await pool.query(deletePrescriptionQuery, [prescriptionId]);

    const deleteMedicationQuery = `
      DELETE FROM prescription_medications
      WHERE
        prescription_id = $1
    `;
    await pool.query(deleteMedicationQuery, [prescriptionId]);

    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

module.exports = {  deletePrescription };