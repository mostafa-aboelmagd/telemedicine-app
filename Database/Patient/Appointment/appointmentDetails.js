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

// not tested with new data model
const getAppointmentDetails = async (appointmentId) => {
  const result = await pool.query(
    `SELECT * 
     FROM appointment 
     WHERE appointment_id = $1`,
    [appointmentId]
  );

  return result.rows[0];
};

const getAppointmentResults = async (appointmentId) => {
  const result = await pool.query(
    `SELECT appointment_diagnosis, appointment_report
     FROM appointment_results
     WHERE results_appointment_reference = $1`,
    [appointmentId]
  );

  return result.rows;
};

const getTreatmentPlan = async (appointmentId) => {
  const result = await pool.query(
    `SELECT treatment_plan_operations, treatment_plan_speciality_referral,
     treatment_plan_referral_notes, created_at, treatment_plan_id
     FROM treatment_plan
     WHERE treatment_plan_appointment_reference = $1`,
    [appointmentId]
  );

  return result.rows[0];
};

const getMedications = async (treatmentPlanId) => {
  const result = await pool.query(
    `SELECT medication_plan_note, medication_plan_start_date,
     medication_plan_end_date, medication_id, medication_plan_name, medication_plan_dosage
     FROM medications
     WHERE medication_treatment_plan_reference = $1`,
    [treatmentPlanId]
  );

  return result.rows;
};

const getMedicalDocuments = async (appointmentId, treatmentPlanId) => {
  const result = await pool.query(
    `SELECT medical_document_data, medical_document_request_note,
     medical_document_id, medical_document_type, medical_document_name
     FROM medical_documents
     WHERE medical_document_appointment_reference = $1
     OR medical_document_treatment_plan_reference = $2`,
    [appointmentId, treatmentPlanId]
  );

  return result.rows;
};

module.exports = {
  getAppointmentDetails,
  getAppointmentResults,
  getTreatmentPlan,
  getMedications,
  getMedicalDocuments,
};