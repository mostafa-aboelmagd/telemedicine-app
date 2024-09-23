const  database  = require('../../../Database/Patient/Appointment/Book');

const bookAppointment = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    const { doctor_availability_id, appointment_complaint, doctor_availability_type, appointmentType, appointmentDuration, availabilitySlot } = req.body;
    let message = '';
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


        //New Daaata Requested
    if (!doctor_availability_id) {
            message = 'Doctor availability ID not found';
            return res.status(404).json(message);
        }
    if (!appointment_complaint) {
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


    // To be tested 
    const appointment_doctor_id = await database.getDoctorFromAvailability(doctor_availability_id);
       if (!appointment_doctor_id) {
           message = 'Doctor Id not found';
           return res.status(400).json(message);
       }

       // Create appointment with status "Pending"
    console.log(
        patientId, 
        appointment_doctor_id,
        availabilitySlot,
        appointmentType,
        appointmentDuration,
        appointment_complaint);

    const appointment = await database.createAppointment({
           patientId, 
           appointment_doctor_id,
           availabilitySlot,
           appointmentType,
           appointmentDuration,
           appointment_complaint,
           appointment_status: 'Pending'
       });   
   
    if (!appointment) {
        return res.status(400).json('Appointment could not be booked');
    }



    
    return res.json({ message: 'Appointment booked successfully', appointment });
};


module.exports = { bookAppointment };

