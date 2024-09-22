const  database  = require('../../../Database/Patient/Appointment/Book');

const bookAppointment = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    const { doctor_availability_id, appointment_complain, doctor_availability_type, appointmentType, appointmentDuration, availabilitySlot, doctorId } = req.body;
    message = '';
    if (!patientId) {
        message = 'Patient ID not found';
        return res.status(404).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
        return res.status(404).json(message);
    }
    if (!appointmentType) {
        message = 'Patient appointment type not found';
        return res.status(404).json(message);
    }
    if (!appointmentDuration) {
        message = 'Patient appointment duration not found';
        return res.status(404).json(message);
    }
    if (!availabilitySlot) {
        message = 'Availability slot not found';
        return res.status(404).json(message);
    }

    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(404).json(message);
    }

        //New 
    if (!doctor_availability_id) {
            message = 'Doctor availability ID not found';
            return res.status(404).json(message);
        }
    if (!appointment_complain) {
            message = 'Appointment complain not found';
            return res.status(404).json(message);
        }
    if (!doctor_availability_type) {
            message = 'Doctor availability type not found';
            return res.status(404).json(message);
        }
    
    const patient = await database.retrievePatient(patientId, patientEmail);
    if (!patient) {
        message = 'Patient not registered';
        return res.status(400).json(message);
    }
    const doctor = await database.retrieveDoctor(doctorId);
    if (!doctor) {
        message = 'Doctor not registered';
        return res.status(400).json(message);
    }

    // To be tested 
    const doctorAvailability = await database.retrieveDoctorAvailability(doctor_availability_id);
       if (!doctorAvailability || doctorAvailability.status !== 'Available') {
           message = 'Doctor is not available at this time';
           return res.status(400).json(message);
       }
   
       // Create appointment with status "Pending"
    const appointment = await database.insertAppointment({
           patientId, 
           doctor_availability_id,
           availabilitySlot,
           appointment_type,
           appointmentDuration,
           appointment_complain,
           appointment_status: 'Pending'
       });   
   
    if (!appointment) {
        return res.status(400).json('Appointment could not be booked');
    }

    const updateAvailability = await database.updateDoctorAvailabilityStatus(doctor_availability_id, 'Pending');
    if (!updateAvailability) {
        return res.status(400).json('Failed to update doctor availability');
    }

    
    return res.json({ message: 'Appointment booked successfully', appointment });
};


module.exports = { bookAppointment };