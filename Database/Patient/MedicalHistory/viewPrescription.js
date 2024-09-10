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
//   "patientId": 1
// }


const retrievePrescription = async (patientId) => {
  try {
    const query = `SELECT 
    p.prescription_id,
    p.prescription_patient_id,
    p.prescriptions_doctor_id,
    p.prescriptions_appointment_id,
    p.prescriptions_notes,
    p.created_at,
    p.updated_at,
    pm.prescription_medication_reference_id,
    pm.prescription_medication_name,
    pm.prescription_medications_dosage,
    pm.prescription_medications_note,
    pm.prescription_medications_start_date,
    pm.prescription_medications_end_date
FROM 
    prescriptions p
JOIN 
    prescription_medications pm ON p.prescription_id = pm.prescription_medication_reference_id
WHERE 
    p.prescription_patient_id = $1`;
    
    const result = await pool.query(query, [patientId]);
    const combinedPrescriptions = result.rows.reduce((acc, curr) => {
      const existingPrescription = acc.find(p => p.prescription_id === curr.prescription_id);
      if (existingPrescription) {
        existingPrescription.medications.push({
          prescription_medication_name: curr.prescription_medication_name,
          prescription_medications_dosage: curr.prescription_medications_dosage,
          prescription_medications_note: curr.prescription_medications_note,
          prescription_medications_start_date: curr.prescription_medications_start_date,
          prescription_medications_end_date: curr.prescription_medications_end_date
        });
      } else {
        acc.push({
          prescription_id: curr.prescription_id,
          prescription_patient_id: curr.prescription_patient_id,
          prescriptions_doctor_id: curr.prescriptions_doctor_id,
          prescriptions_appointment_id: curr.prescriptions_appointment_id,
          prescriptions_notes: curr.prescriptions_notes,
          created_at: curr.created_at,
          updated_at: curr.updated_at,
          medications: [{
            prescription_medication_name: curr.prescription_medication_name,
            prescription_medications_dosage: curr.prescription_medications_dosage,
            prescription_medications_note: curr.prescription_medications_note,
            prescription_medications_start_date: curr.prescription_medications_start_date,
            prescription_medications_end_date: curr.prescription_medications_end_date
          }]
        });
      }
      return acc;
    }, []);
    return combinedPrescriptions;

    if (result.rows.length) {
      return result.rows;
     
    }
    return false;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};

module.exports = {retrievePrescription};


