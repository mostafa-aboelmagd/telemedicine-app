const database = require('../../Database/Doctor/addAvailability');
const { createAppointment } = require('../Appointment/doctorCreate');

const addAvailability = async (req, res, next) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    const doctorAvailabilityDay = req.body.day;
    const doctorAvailabilityHour = req.body.hour;
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
        message = 'Doctor not available at this time';
        return res.status(404).json(message);
    }
    const availability = await database.insertAvailability(doctorId, doctorAvailabilityDay, doctorAvailabilityHour);
    if (!availability) {
        message = 'Could not add availability';
        return res.status(405).json(message);
    }
    req.slot = availability[0].doctor_availability_id;
    createAppointment(req, res)
    
}

module.exports = { addAvailability };