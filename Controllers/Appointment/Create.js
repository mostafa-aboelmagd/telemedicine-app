const  database  = require('../../Database/Appointment/Create');

const createAppointment = async (req, res) => {
    const patientUserId = req.id;
    const patientEmail = req.email;
    if (!patientUserId) {
        return res.status(400).send('Patient ID not found');
    }
    if (!patientEmail) {
        return res.status(401).send('Patient email not found');
    }
    const patientFlag = await database.retrievePatient(patientUserId);
    if (!patientFlag) {
        return res.status(402).send('Patient not registered');
    }
    const { doctor_id, appointment_date_time} = req.body;
    if (!doctor_id) {
        return res.status(403).send('Please provide doctor ID');
    }
    if (!appointment_date_time) {
        return res.status(404).send('Please provide appointment date and time');
    }
    const doctorFlag = await database.retrieveDoctor(doctor_id);
    if (!doctorFlag) {
        return res.status(405).send('Doctor not registrered');
    }
    const doctorAvailabilityFlag = await database.checkDoctorAvailability(doctor_id, appointment_date_time);
    if (!doctorAvailabilityFlag) {
        return res.status(406).send('Doctor not available at this time');
    }
    const result = await database.insertAppointment(doctorFlag[0].doctor_id, patientFlag[0].patient_id, appointment_date_time);
    res.status(200).json({ message: 'Appointment created successfully', appointment: result });
}


module.exports = { createAppointment};