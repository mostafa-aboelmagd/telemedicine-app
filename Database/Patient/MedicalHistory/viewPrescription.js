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


