const database = require('../../Database/Doctor/deleteAvailability');

const deleteAvailability = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    const doctorAvailabilityDay = req.body.availabilityday;
    const doctorAvailabilityHour = req.body.availabilityhour;
    const doctorAvailabilityId = req.body.availabilityId;
    let message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    if (!doctorAvailabilityDay) {
        message = 'Availability day not found';
        return res.status(402).json(message);
    }
    if (!doctorAvailabilityHour) {
        message = 'Availability hour not found';
        return res.status(403).json(message);
    }
    if (!doctorAvailabilityId) {
        message = 'Availability ID not found';
        return res.status(404).json(message);
    }
    const doctorAvailabilityFlag = await database.checkDoctorAvailability(doctorId, doctorAvailabilityDay, doctorAvailabilityHour, doctorAvailabilityId);
    if (!doctorAvailabilityFlag) {
        message = 'Doctor is already not available at this time';
        return res.status(405).json(message);
    }
    const availability = await database.deleteAvailability(doctorId, doctorAvailabilityDay, doctorAvailabilityHour, doctorAvailabilityId);
    if (!availability) {
        message = 'Could not delete availability';
        return res.status(406).json(message);
    }
}

module.exports = { deleteAvailability };