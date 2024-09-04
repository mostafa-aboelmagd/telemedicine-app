const  database  = require('../../../Database/Patient/Appointment/book');

const bookAppointment = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    const { patientAppointmentType, patientAppointmentDuration, availabilitySlot } = req.body;
    message = '';
    if (!patientId) {
        message = 'Patient ID not found';
        return res.status(400).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
        return res.status(401).json(message);
    }
    if (!patientAppointmentType) {
        message = 'Patient appointment type not found';
        return res.status(402).send(message);
    }
    if (!patientAppointmentDuration) {
        message = 'Patient appointment duration not found';
        return res.status(403).send(message);
    }
    if (!availabilitySlot) {
        message = 'Availability slot not found';
        return res.status(404).send(message);
    }
    const patient = await database.retrievePatient(patientId, patientEmail);
    if (!patient) {
        return res.status(405).send('Patient not registered');
    }
    const appointment = await database.updateAppointment(patientId, patientAppointmentType, patientAppointmentDuration, availabilitySlot, patient[0].patient_current_doctor_id);
    if (!appointment) {
        return res.status(406).send('Appointment could not be booked');
    }
    res.json({ message: 'Appointment booked successfully', appointment: appointment });
}

module.exports = { bookAppointment };