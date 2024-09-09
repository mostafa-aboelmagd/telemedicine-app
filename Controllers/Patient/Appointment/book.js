const  database  = require('../../../Database/Patient/Appointment/Book');

const bookAppointment = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    const { appointmentType, appointmentDuration, availabilitySlot, doctorId } = req.body;
    message = '';
    if (!patientId) {
        message = 'Patient ID not found';
        return res.status(404).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
        return res.status(404).json(message);
    }
    if (!appointmentType) {
        message = 'Patient appointment type not found';
        return res.status(404).json(message);
    }
    if (!appointmentDuration) {
        message = 'Patient appointment duration not found';
        return res.status(404).json(message);
    }
    if (!availabilitySlot) {
        message = 'Availability slot not found';
        return res.status(404).json(message);
    }
    if (!availabilitySlot) {
        message = 'Doctor availability slot not found';
        return res.status(404).json(message);
    }
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(404).json(message);
    }
    const patient = await database.retrievePatient(patientId, patientEmail);
    if (!patient) {
        message = 'Patient not registered';
        return res.status(400).json(message);
    }
    const doctor = await database.retrieveDoctor(doctorId);
    if (!doctor) {
        message = 'Doctor not registered';
        return res.status(400).json(message);
    }
    const appointmentFlag = await database.checkAppointmentAvailability(doctorId, availabilitySlot);
    if (appointmentFlag) {
        message = 'Doctor is not available at this time';
        return res.status(400).json(message);
    }
    const appointment = await database.insertAppointment(patientId, doctorId, appointmentType, appointmentDuration, availabilitySlot);
    if (!appointment) {
        return res.status(400).json('Appointment could not be booked');
    }
    res.json({ message: 'Appointment booked successfully', appointment: appointment });
}

module.exports = { bookAppointment };