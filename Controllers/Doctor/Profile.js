const  database  = require('../../Database/Doctor/Profile');

const showProfile = async (req, res) => {
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
    const doctor = await database.retrieveDoctorInfo(doctorUserId, doctorEmail);
    if (!doctor) {
        message = 'Could not retrieve doctor info';
        return res.status(402).json(message);
    }
    return res.json({ doctor: doctor, token: req.cookies.jwt });
}

module.exports = { showProfile };
