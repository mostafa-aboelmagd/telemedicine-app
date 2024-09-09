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


const addPrescription = async (patientId, medicationData) => {
  try {
    const query = `
      INSERT INTO prescriptions (
        patient_user_id_reference
      ) VALUES (
        $1
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

const updatePrescription = async (prescriptionId, medicationData) => {
  try {
    // Update the prescription in the prescriptions table
    const updatePrescriptionQuery = `
      UPDATE prescriptions
      SET
        updated_at = NOW()
      WHERE
        prescription_id = $1
    `;
    await pool.query(updatePrescriptionQuery, [prescriptionId]);

    // Delete existing medication entries
    const deleteExistingMedicationsQuery = `
      DELETE FROM prescription_medications
      WHERE
        prescription_id = $1
    `;
    await pool.query(deleteExistingMedicationsQuery, [prescriptionId]);

    // Insert new medication entries
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

    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

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



module.exports = { retrievePrescription, addPrescription, updatePrescription, deletePrescription };