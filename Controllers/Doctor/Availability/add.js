const database = require('../../../Database/Doctor/Availability/Add');

const addAvailability = async (req, res) => {
    try {
      const doctorId = req.id;
      const availabilityData = req.body;
      // Loop through each availability entry
      for (const entry of availabilityData) {
        const { doctor_availability_type, doctor_availability_day_hour } = entry;
        const [date, time] = doctor_availability_day_hour.split(' ');
        const dayOfWeek = new Date(date).getDay(); // Get day of the week (0-6)
//   availability will be added aoutomatically for the coming 4 weeks at the same day of the week
        // Calculate availability for the next 4 weeks
        for (let i = 0; i < 4; i++) {
          const newDate = new Date(date);
          newDate.setDate(newDate.getDate() + i * 7 + (dayOfWeek === 0 ? 7 : dayOfWeek - 1)); // Adjust for Sunday
          const availabilityEntry = {
            doctor_availability_doctor_id: doctorId,
            doctor_availability_type,
            doctor_availability_status: 'Available',
            doctor_availability_day_hour: `${newDate.toISOString().slice(0, 10)} ${time}`,
          };
          await database.insertDoctorAvailability(availabilityEntry);
        }
      }
      res.status(201).json({ message: 'Doctor availability added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding doctor availability' });
    }
  };
module.exports = { addAvailability};