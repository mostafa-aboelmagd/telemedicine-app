const  database  = require('../../../Database/Patient/Appointment/patientGetAvailabilities');


const patientGetAvailabilities = async (req, res) => {
    try {
        const doctorId = req.params.doctorId; // Assuming doctor ID is available in req.id
    
        const available_slots = await database.getDoctorTimeslots(doctorId);
      
        const booked = await database.getDoctorAvailabilityDetails(doctorId);
      
       
    
        res.status(200).json({ available_slots, booked });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving availability' });
      }
    };




module.exports = { patientGetAvailabilities };