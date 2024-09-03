const  database  = require('../../Database/Appointment/Create');
const { dateValidation } = require('../../Utilities');

const createAppointment = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    if (!doctorUserId) {
        return res.status(400).send('Doctor ID not found');
    }
    if (!doctorEmail) {
        return res.status(401).send('Doctor email not found');
    }
    const { duration, slot } = req.body;
    if (!duration) {
        return res.status(402).send('Duration not found');
    }  
    if (!slot) {
        return res.status(403).send('Slot not found');
    }
    const doctor = await database.retrieveDoctor(doctorUserId, doctorEmail);
    if (!doctor) {
        return res.status(404).send('Doctor not registered');
    }
    const appointment = await database.insertAppointment(doctorUserId, duration, slot);
    if (!appointment) {
        return res.status(405).send('Appointment could not be created');
    }
    res.status(200).json({ message: 'Appointment created successfully', appointment: appointment });
}


module.exports = { createAppointment};

// const doctorAvailabilityFlag = await database.checkDoctorAvailability(doctorUserId, appointment_date_time);
// if (!doctorAvailabilityFlag) {
//     return res.status(405).send('Doctor not available at this time');
// }