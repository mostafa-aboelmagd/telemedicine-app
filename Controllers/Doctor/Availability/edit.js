const  database  = require('../../../Database/Doctor/Availability/Edit');

const editAvailability = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const { availabilityDay, availabilityHour, availabilityId } = req.body;
    if (!availabilityDay) {
        message = 'Please provide availability day';
        return res.status(402).json(message);
    }
    if (!availabilityHour) {
        message = 'Please provide availability hour';
        return res.status(403).json(message);
    }
    if (!availabilityId) {
        message = 'Please provide availability ID';
        return res.status(404).json(message);
    }
    const doctorAvailability = await database.updateAvailability(doctorId, availabilityDay, availabilityHour, availabilityId);
    if (doctorAvailability) {
        message = 'Doctor availability is successfully updated';
        return res.json({ message, doctorAvailability });
    }
    message = 'Could not update doctor availability';
    return res.status(405).json(message);
};

module.exports = { editAvailability };