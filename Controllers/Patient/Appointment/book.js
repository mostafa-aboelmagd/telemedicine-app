const  database  = require('../../../Database/Patient/Appointment/Book');

const bookAppointment = async (req, res) => {
    try {
        const patientId = req.id; // Assuming patient ID is retrieved from middleware or authentication
    
        // Validate request body (consider using a validation library)
        if (!req.body || !req.body.appointment_availability_slot || !req.body.complaint || !req.body.duration || !req.body.appointment_settings_type || !req.body.appointment_type) {
          return res.status(400).json({ message: 'Missing required fields in request body' });
        }
    
        const { appointment_availability_slot, complaint, duration, appointment_settings_type, appointment_type, appointment_parent_reference } = req.body;
    
        const doctorId = await database.getDoctorIdFromSlot(appointment_availability_slot);
    
        if (!doctorId) {
          return res.status(404).json({ message: 'Appointment slot not found or invalid' });
        }
    
        await database.createAppointment(patientId, doctorId, appointment_availability_slot, complaint, duration, appointment_settings_type, appointment_type, appointment_parent_reference);
    
        return res.status(201).json({ message: 'Appointment scheduled successfully' });
      } catch (error) {
        console.error('Error scheduling appointment:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    };


module.exports = { bookAppointment };