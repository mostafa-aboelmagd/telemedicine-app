const  database  = require('../../../Database/Doctor/AppointmentResponse');
// confirm /decline appointments requests

const doctorAppointmentResponse = async (req, res) => {
  const appointmentId = req.params.appointmentId;
  const response = req.params.response;

  try {
    if (response === 'accept') {
      await database.acceptAppointment(appointmentId);
      return res.json({ message: 'Appointment accepted successfully' });
    } else if (response === 'decline') {
      await database.declineAppointment(appointmentId);
      return res.json({ message: 'Appointment declined successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid response. Must be "accept" or "decline"' });
    }
  } catch (error) {
    console.error('Error responding to appointment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { doctorAppointmentResponse };