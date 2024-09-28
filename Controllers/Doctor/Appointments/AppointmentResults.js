const database = require('../../../Database/Doctor/AppointmentResults');

// Appointment result submission form
const AppointmentResultSubmission = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;

        const {
            diagnosis: appointment_diagnosis, 
            operations: treatment_plan_operations, 
            report: appointment_report, 
            specialityReferral: treatment_plan_speciality_referral, 
            specialityReferralNotes: treatment_plan_referral_notes, 
            updatedInputs: medications
        } = req.body;

        if (
            !appointment_diagnosis || 
            !appointment_report || 
            !treatment_plan_operations || 
            !treatment_plan_speciality_referral || 
            !treatment_plan_referral_notes 
        ) {
            return res.status(400).json({ message: 'Missing required fields in request body' });
        }

        const AppointmentResults = {
            appointment_diagnosis,
            appointment_report,
            results_appointment_reference: appointmentId,
        };

        const TreatmentPlan = {
            treatment_plan_appointment_reference: appointmentId,
            treatment_plan_operations,
            treatment_plan_speciality_referral,
            treatment_plan_referral_notes
        };
        for (const medication of medications) {
            console.log(medication.medication_name)}
        const TreatmentPlanID = await database.getTreatmentPlanIdByReference(appointmentId);
        await database.insertAppointmentResults(AppointmentResults);
        await database.insertTreatmentPlan(TreatmentPlan);
        await database.insertMedications(medications,TreatmentPlanID);
        await database.ChangeAppointmentStatus(appointmentId,'Completed');


        return res.status(201).json({
            message: 'Appointment result and treatment plan submitted successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
module.exports = { AppointmentResultSubmission };
