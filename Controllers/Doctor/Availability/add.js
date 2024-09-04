const database = require('../../../Database/Doctor/Availability/add');

const addAvailability = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    const doctorAvailabilityDay = req.body.availabilityday;
    const doctorAvailabilityHour = req.body.availabilityhour;
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
    const doctorAvailabilityFlag = await database.checkDoctorAvailability(doctorId, doctorAvailabilityDay, doctorAvailabilityHour);
    if (doctorAvailabilityFlag) {
        message = 'Doctor already available at this time';
        return res.status(404).json(message);
    }
    const availability = await database.insertAvailability(doctorId, doctorAvailabilityDay, doctorAvailabilityHour);
    if (!availability) {
        message = 'Could not add availability';
        return res.status(405).json(message);
    }
    res.json({ message: 'Availability added successfully', availability: availability });
}

module.exports = { addAvailability };