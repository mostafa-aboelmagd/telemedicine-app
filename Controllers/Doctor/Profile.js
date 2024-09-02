const  database  = require('../../Database/Doctor/Profile');

const showProfile = async (req, res) => {
    const doctorUserId = req.id;
    const doctorEmail = req.email;
    if (!doctorUserId) {
        return res.status(400).send('Doctor ID not found');
    }
    if (!doctorEmail) {
        return res.status(401).send('Doctor email not found');
    }
    const doctor = await database.retrieveDoctorInfo(doctorUserId);
    if (!doctor) {
        return res.status(402).send('Could not retrieve doctor info');
    }
    return res.json(doctor);
}

module.exports = { showProfile };
