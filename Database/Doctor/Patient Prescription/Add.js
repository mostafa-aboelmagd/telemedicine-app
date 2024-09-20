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


const insertPatientPrescription = async (doctorId, appointmentId, medicationDataList) => {
    try {

        const appointmentPatientAndDoctorIds = await pool.query(
            'SELECT appointment_patient_id, appointment_doctor_id FROM appointment WHERE appointment_id = $1', [appointmentId]);
        if (!appointmentPatientAndDoctorIds.rows.length || appointmentPatientAndDoctorIds.rows[0].appointment_doctor_id !== doctorId) {
            console.log('Appointment not found');
            return false;
        }

        const newPrescription = await pool.query(
            'INSERT INTO prescriptions(prescriptions_doctor_id, prescription_patient_id, prescriptions_appointment_id, prescriptions_notes) VALUES($1, $2, $3, $4) RETURNING prescription_id',
            [doctorId, appointmentPatientAndDoctorIds.rows[0].appointment_patient_id, appointmentId, 'Notes']
        );
        if (!newPrescription.rows.length) {
            console.log('Could not add prescription');
            return false;
        }

        const insertedMedications = [];
        for (const medication of medicationDataList) {
            try {
                const insertedMedication = await pool.query(
                    'INSERT INTO prescription_medications(prescription_medication_reference_id, prescription_medication_name, prescription_medications_dosage, prescription_medications_note, prescription_medications_start_date, prescription_medications_end_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING prescription_medication_id',
                    [newPrescription.rows[0].prescription_id, medication.name, medication.dose, medication.notes, medication.start, medication.end]
                );
                if (insertedMedication.rows.length) {
                    insertedMedications.push(insertedMedication.rows[0]);
                } else {
                    console.log('Could not add medication');
                }
            } catch (error) {
                console.error('Error adding medication:', error);
                return false;
            }
        }

        if (insertedMedications.length !== medicationDataList.length) {
            console.log('Could not add all medications');
            return false;
        }

        console.log('Inserted Medications:', insertedMedications);
        return newPrescription.rows;
    } catch (error) {
        console.error('Error inserting patient prescription:', error);
        return false;
    }
};

module.exports = { insertPatientPrescription};