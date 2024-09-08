const  database  = require('../../Database/Doctor/Profile');

const doctorInfo = async (req, res) => {
    const doctorUserId = 32;
    const doctorEmail = "dr.khaled@example.com";
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const doctor = await database.retrieveDoctorInfo(doctorUserId, doctorEmail);
    if (!doctor) {
        message = 'Could not retrieve doctor info';
        return res.status(404).json(message);
    }
    return res.json(doctor);
}

const doctorPatients = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const patients = await database.retrieveDoctorPatients(doctorUserId, doctorEmail);
    if (!patients) {
        message = 'Could not retrieve patients';
        return res.status(402).json(message);
    }
    return res.json(patients);
}

const doctorAppointments = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const appointments = await database.retrieveDoctorAppointments(doctorUserId, doctorEmail);
    if (!appointments) {
        message = 'Could not retrieve appointments';
        return res.status(402).json(message);
    }
    return res.json(appointments);
}

const doctorAvailabilities = async (req, res) => {
    const doctorId = 32;
    const formattedAvailabilities = {};
    let message = '';

    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json({ message });
    }

    try {
        const availabilities = await database.retrieveDoctorAvailabilities(doctorId);
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
}

const doctorReviews = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const reviews = await database.retrieveDoctorReviews(doctorUserId, doctorEmail);
    if (!reviews) {
        message = 'Could not retrieve reviews';
        return res.status(402).json(message);
    }
    return res.json(reviews);
}

const doctorExperience = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const experience = await database.retrieveDoctorExperience(doctorUserId, doctorEmail);
    if (!experience) {
        message = 'Could not retrieve experience';
        return res.status(402).json(message);
    }
    return res.json(experience);
}

const doctorEducation = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const education = await database.retrieveDoctorEducation(doctorUserId, doctorEmail);
    if (!education) {
        message = 'Could not retrieve education';
        return res.status(402).json(message);
    }
    return res.json(education);
}

const doctorInterests = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const interests = await database.retrieveDoctorInterests(doctorUserId, doctorEmail);
    if (!interests) {
        message = 'Could not retrieve interests';
        return res.status(402).json(message);
    }
    return res.json(interests);
}

const doctorLanguages = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const languages = await database.retrieveDoctorLanguages(doctorUserId, doctorEmail);
    if (!languages) {
        message = 'Could not retrieve languages';
        return res.status(402).json(message);
    }
    return res.json(languages);
}   

module.exports = { doctorInfo, doctorPatients, doctorAppointments, doctorAvailabilities, doctorReviews, doctorExperience, doctorEducation, doctorInterests, doctorLanguages };
