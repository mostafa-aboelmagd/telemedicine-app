const  database  = require('../../../Database/Patient/Appointment/Book');

const bookAppointment = async (req, res) => {
  try {
    const { doctor_id, complaint, duration, appointment_type, appointment_date } = req.body;
    const patientId = req.id; // Assuming patient ID is available in req.id
    const time_slot_code = req.body.time_slot_code;

    const doctorAvailabilityId = await database.createDoctorAvailability(doctor_id, time_slot_code, appointment_date);
    if (!doctorAvailabilityId) {
      return res.status(400).json({ message: 'Failed to create doctor availability' });
    }

    const appointment = await database.createAppointmentEntry(time_slot_code,patientId, doctor_id, doctorAvailabilityId, complaint, duration, appointment_type);
    if (!appointment) {
      return res.status(400).json({ message: 'Failed to create appointment' });
    }

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { bookAppointment };