const  database  = require('../../Database/Appointment/doctorEdit');

const editDoctorAppointment = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    const doctorOldAvailabilitySlot = req.body.oldSlot;
    const doctorNewAvailabilitySlot = req.body.newSlot;
    message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    if (!doctorOldAvailabilitySlot) {
        message = 'Doctor availability old slot not found';
        return res.status(402).send(message);
    }
    if (!doctorNewAvailabilitySlot) {
        message = 'Doctor availability new slot not found';
        return res.status(403).send(message);
    }
    const doctor = await database.retrieveDoctor(doctorId, doctorEmail);
    if (!doctor) {
        return res.status(404).send('Doctor not registered');
    }
    const availabilityNewSlotFlag = await database.checkDoctorAvailability(doctorId, doctorNewAvailabilitySlot);
    if (availabilityNewSlotFlag) {
        message = 'Doctor is already have an appointment at this time';
        return res.status(405).json(message);
    }
    const appointment = await database.updateAppointment(doctorId, doctorOldAvailabilitySlot, doctorNewAvailabilitySlot);
    if (!appointment) {
        return res.status(406).json({ message: 'Appointment could not be edited' });   
    }
    return res.json({ message: 'Appointment edited successfully', appointment: appointment });
}

module.exports = { editDoctorAppointment };