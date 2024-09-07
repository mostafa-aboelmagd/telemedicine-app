const database = require('../../../Database/Doctor/Availability/Add');

const addAvailability = async (req, res) => {
    const doctorId = 32;
    const doctorAvailabilityDaysHours = req.body.timesChosen;
    const successfullyEnteredAvailabilities = {};
    let message = '';

    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json({ message });
    }
    if (!doctorAvailabilityDaysHours) {
        message = 'Doctor availability days and hours not found';
        return res.status(402).json({ message });
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
                        if (!successfullyEnteredAvailabilities[day]) {
                            successfullyEnteredAvailabilities[day] = [];
                        }
                        successfullyEnteredAvailabilities[day].push(hour);
                    } else {
                        console.log(`Could not add availability for ${doctorAvailabilityDayHour}`);
                    }
                } else {
                    console.log('Doctor already available at this time');
                }
            }
        }
        if (Object.keys(successfullyEnteredAvailabilities).length === 0) {
            message = 'Could not add any availability';
            return res.status(403).json({ message });
        }
        res.json({ message: 'Availability added successfully', successfullyEnteredAvailabilities });
    } catch (error) {
        console.error('Error adding availability:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addAvailability };