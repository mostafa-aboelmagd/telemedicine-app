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



const insertAppointmentResults = async (AppointmentResults) => {
    try {
      const client = await pool.connect();
  
      const result = await client.query(
        `INSERT INTO appointment_results (
          appointment_diagnosis,
          appointment_report,
          results_appointment_reference
        ) VALUES ($1, $2, $3) RETURNING *`, 
        [
          AppointmentResults.appointment_diagnosis,
          AppointmentResults.appointment_report,
          AppointmentResults.results_appointment_reference
        ]
      );
  
      client.release();
      return result.rows[0]; 
    } catch (error) {
      console.error('Error inserting appointment result:', error);
      throw error; 
    }
  };

const getTreatmentPlanIdByReference = async (appointmentReference) => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT treatment_plan_id FROM treatment_plan 
             WHERE treatment_plan_appointment_reference = $1`,
            [appointmentReference]
        );

        return result.rows[0] ? result.rows[0].treatment_plan_id : null; 
    } catch (error) {
        console.error('Error fetching treatment plan ID:', error);
        throw error; 
    } finally {
        client.release(); 
    }
};
  
const insertMedications = async (medications,TreatmentID) => {
  try {
      const client = await pool.connect();
      
      for (const med of medications) {
          await client.query(
              `INSERT INTO medications (
                  medication_treatment_plan_reference,
                  medication_name,
                  medication_dosage,
                  medication_note,
                  medication_start_date,
                  medication_end_date
              ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
              [
                  TreatmentID,
                  med.medication_name,
                  med.medication_dosage,
                  med.medication_note,
                  med.medication_start_date,
                  med.medication_end_date
              ]
          );
          
      }

      client.release();
  } catch (error) {
      console.error('Error inserting medications:', error);
      throw error;
  }
};


  const insertTreatmentPlan = async (TreatmentPlan) => {
    try {
      const client = await pool.connect();
  
      const result = await client.query(
        `INSERT INTO treatment_plan (
          treatment_plan_appointment_reference,
          treatment_plan_operations,
          treatment_plan_speciality_referral,
          treatment_plan_referral_notes) VALUES ($1, $2, $3, $4) RETURNING *`, 
        [
          TreatmentPlan.treatment_plan_appointment_reference,
          TreatmentPlan.treatment_plan_operations,
          TreatmentPlan.treatment_plan_speciality_referral,
          TreatmentPlan.treatment_plan_referral_notes
        ]
      );
  
      client.release();
      return result.rows[0]; 
    } catch (error) {
      console.error('Error inserting treatment plan:', error);
      throw error; 
    }
  };
    
  

  const ChangeAppointmentStatus = async (appointmentId, Status) => {
    let client;
    try {
      client = await pool.connect();
  
      const result = await client.query(
        `UPDATE appointment
         SET appointment_status = $1 
         WHERE appointment_id = $2 RETURNING *`,
        [Status, appointmentId]
      );
  
      client.release();
      return result.rows[0]; 
    } catch (error) {
      console.error('Error inserting appointment result:', error);
      throw error; 
    }
  };
  
  module.exports = { ChangeAppointmentStatus, insertAppointmentResults, insertTreatmentPlan, getTreatmentPlanIdByReference,insertMedications};
