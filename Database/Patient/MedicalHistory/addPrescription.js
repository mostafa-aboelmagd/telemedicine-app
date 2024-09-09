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
        console.log('Connected to the database prescription1');
        client.release();
    } catch (error) {
        console.error('Database connection error', error.stack);
    }
})();


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


const addPrescription = async (patientId, medicationData) => {
  try {
    const query = `
      INSERT INTO prescriptions (
        prescription_patient_id,prescription_doctor_id
      ) VALUES (
        $1,$2
      ) RETURNING prescription_id;
    `;

    const result = await pool.query(query, [patientId]);
    const prescriptionId = result.rows[0].prescription_id;

    const medicationInsertQueries = medicationData.map((medication) => {
      return `
        INSERT INTO prescription_medications (
          prescription_id,
          medication_name,
          dosage,
          note
        ) VALUES (
          $1, $2, $3, $4
        )
      `;
    });
    

    await pool.query(medicationInsertQueries.join(';'), [prescriptionId, ...medicationData.map((medication) => [medication.medicationName, medication.dosage, medication.note])]);

    return { prescriptionId, medications: medicationData };
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

module.exports = {addPrescription };
