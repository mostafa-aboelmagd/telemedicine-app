const database = require('../../../Database/Doctor/Availability/Add');

const addAvailability = async (req, res) => {
    const doctorId = 32;
    const doctorAvailabilityDaysHours = req.body;
    const successfullyEnteredAvailabilities = {};
    let message = '';

    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json({ message });
    }
    if (!doctorAvailabilityDaysHours) {
        message = 'Doctor availability days and hours not found';
        return res.status(402).json({ message, doctorAvailabilityDaysHours });
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
                       console.log({message: 'failed after insertion', availability});
                    }
                } else {
                    console.log({message: 'failed after availability check', doctorAvailabilityFlag});
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

const getAllAvailabilities = async (req, res) => {
    const doctorId = 32;
    const formattedAvailabilities = {};
    let message = '';

    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json({ message });
    }

    try {
        const availabilities = await database.retrieveAllAvailabilities(doctorId);
        if (availabilities) {
            availabilities.forEach(availability => {
                const date = new Date(availability.doctor_availability_day_hour);
                const options = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                };
                const formattedDate = date.toLocaleDateString('en-US', options).replace(/, /g, ' ');
                const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });

                if (!formattedAvailabilities[formattedDate]) {
                    formattedAvailabilities[formattedDate] = [];
                }
                formattedAvailabilities[formattedDate].push({ time: formattedTime, id: availability.doctor_availability_id });
            });

            message = 'Doctor availabilities retrieved successfully';
            return res.json({ message, availabilities: formattedAvailabilities });
        }
        message = 'Could not retrieve doctor availabilities';
        return res.status(401).json({ message });
    } catch (error) {
        console.error('Error retrieving availabilities:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addAvailability, getAllAvailabilities };