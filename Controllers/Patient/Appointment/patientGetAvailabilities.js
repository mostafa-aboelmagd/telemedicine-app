const  database  = require('../../../Database/Patient/Appointment/patientGetAvailabilities');


const patientGetAvailabilities = async (req, res) => {
    try {
        const doctorId = req.params.doctorId; // Assuming doctor ID is available in req.id
    
        const available_slots = await database.getDoctorTimeslots(doctorId);
      
        const booked = await database.getDoctorAvailabilityDetails(doctorId);
      
        // if (timeslots.length > 0) {
        // if (!available_slots.length && !booked.length) {
        //   return res.status(404).json({ message: 'No timeslots or availability found for the doctor' });
        // }
    
        res.status(200).json({ available_slots, booked });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving availability' });
      }
    };



// const patientGetAvailabilities = async (req, res) => {
//     const doctorId = req.params.doctorId;
//     console.log(doctorId);
//     const formattedAvailabilities = {};
//     let message = '';
//     if (!doctorId) {
//         message = 'Doctor ID not found';
//         return res.status(404).json({ message });
//     }

//     try {
//         const availabilities = await database.retrieveDoctorAvailabilities(doctorId);
//         if (availabilities) {
//             availabilities.forEach(availability => {
//                 const date = new Date(availability.doctor_availability_day_hour);
//                 const options = { 
//                     weekday: 'short', 
//                     year: 'numeric', 
//                     month: 'short', 
//                     day: 'numeric' 
//                 };
//                 const formattedDate = date.toLocaleDateString('en-US', options).replace(/, /g, ' ');
//                 const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });

//                 if (!formattedAvailabilities[formattedDate]) {
//                     formattedAvailabilities[formattedDate] = [];
//                 }
//                 formattedAvailabilities[formattedDate].push({ time: formattedTime, id: availability.doctor_availability_id });
//             });
//             message = 'Doctor availabilities retrieved successfully';
//             return res.json({ message, availabilities: formattedAvailabilities });
//         }
//         message = 'Could not retrieve doctor availabilities';
//         return res.status(400).json({ message });
//     } catch (error) {
//         console.error('Error retrieving availabilities:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

module.exports = { patientGetAvailabilities };