const database = require('../../Database/Doctor/addAvailability');
const { dateValidation } = require('../../Utilities');

const addAvailability = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    if (!doctorUserId) {
        return res.status(400).send('Doctor ID not found');
    }
    if (!doctorEmail) {
        return res.status(401).send('Doctor email not found');
    }
    const { date, startTime, endTime } = req.body;
    if (!date || !startTime || !endTime) {
        return res.status(403).send('Date, start time, or end time not found');
    }
    if (!dateValidation(date)) {
        return res.status(404).send('Invalid date format');
    }
    if (startTime >= endTime) {
        return res.status(405).send('Start time cannot be greater than or equal to end time');
    }
    const availability = await database.addAvailability(doctorUserId, date, startTime, endTime);
    if (!availability) {
        return res.status(406).send('Could not add availability');
    }
    return res.json({ availability: availability, token: req.cookies.jwt });
}