const database = require('../../../Database/Doctor/Availability/Add');

const addAvailability = async (req, res) => {
    const doctorId = 32;
    const doctorAvailabilityDaysHours = req.body;
    const successfullyEnteredAvailabilities = [];
    let message = '';

    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(404).json({ message });
    }
    if (!doctorAvailabilityDaysHours) {
        message = 'Doctor availability days and hours not found';
        return res.status(404).json({ message });
    }

    try {
        for (const [day, hours] of Object.entries(doctorAvailabilityDaysHours)) {
            for (const hour of hours) {
                const doctorAvailabilityDayHour = `${day} ${hour}`;
                const doctorAvailabilityDayHourNoTZ = new Date(doctorAvailabilityDayHour).toISOString().slice(0, 19).replace('T', ' ');

                const doctorAvailabilityFlag = await database.checkDoctorAvailability(doctorId, doctorAvailabilityDayHourNoTZ);
                if (doctorAvailabilityFlag) {
                    const availability = await database.insertAvailability(doctorId, doctorAvailabilityDayHourNoTZ);
                    if (availability) {
                        successfullyEnteredAvailabilities.push(availability);
                    } else {
                        console.log({message: 'failed after insertion', availability});
                    }
                } else {
                    console.log({message: 'failed after availability check', doctorAvailabilityFlag});
                }
            }
        }
        if (successfullyEnteredAvailabilities.length === 0) {
            message = 'Could not add any availability';
            return res.status(400).json({ message });
        }
        return res.json({ message: 'Availability added successfully', successfullyEnteredAvailabilities });
    } catch (error) {
        console.error('Error adding availability:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addAvailability};