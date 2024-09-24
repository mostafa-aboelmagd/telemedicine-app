const database = require('../../../Database/Doctor/Availability/Add');

const addAvailability = async (req, res) => {
    const doctorId = req.id;
  const { doctorAvailabilityDayHour, doctorAvailabilityType } = req.body;

  // Validate input (optional)
  if (!doctorId || !doctorAvailabilityDayHour || !doctorAvailabilityType) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const insertedAvailability = await database.insertDoctorAvailability(doctorId, doctorAvailabilityDayHour, doctorAvailabilityType); // Pass additional data if needed
    if (insertedAvailability) {
      return res.json({ message: 'Doctor availability added successfully', availability: insertedAvailability });
    } else {
      return res.status(500).json({ message: 'Failed to add doctor availability' });
    }
  } catch (error) {
    console.error('Error adding doctor availability:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addAvailability};