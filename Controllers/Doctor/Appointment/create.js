const  database  = require('../../../Database/Doctor/Appointment/create');

const createAppointment = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    const doctorAvailabilitySlot = req.body.slot;
    message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    if (!doctorAvailabilitySlot) {
        message = 'Doctor availability slot not found';
        return res.status(402).send(message);
    }
    const doctor = await database.retrieveDoctor(doctorId, doctorEmail);
    if (!doctor) {
        return res.status(403).send('Doctor not registered');
    }
    const appointment = await database.insertAppointment(doctorId, doctorAvailabilitySlot);
    if (!appointment) {
        return res.status(404).send('Appointment could not be created');
    }
    res.json({ message: 'Appointment created successfully', appointment: appointment });
}

module.exports = { createAppointment };