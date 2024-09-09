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
        console.log('Connected to the database prescription3');
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


const retrievePrescription = async (patientId) => {
  try {
    const query = `
      SELECT
        p.prescription_id,
        pm.medication_name,
        pm.dosage,
        pm.note
      FROM
        prescriptions p
      JOIN prescription_medications pm ON p.prescription_id = pm.prescription_id
      WHERE
        p.patient_user_id_reference = $1
    `;

    const result = await pool.query(query, [patientId]);
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