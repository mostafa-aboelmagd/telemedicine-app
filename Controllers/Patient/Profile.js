const  database  = require('../../Database/Patient/Profile');

const showProfile = async (req, res) => {
    const patientUserId = req.id;
    const patientEmail = req.email;
    let message = '';
    if (!patientUserId) {
        message = 'Patient ID not found';
        return res.status(400).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
        return res.status(401).json(message);
    }
    const patient = await database.retrievePatientInfo(patientUserId, patientEmail);
    if (!patient) {
        message = 'Could not retrieve patient info';
        return res.status(402).json(message);
    }
    return res.json({ patient: patient, token: req.cookies.jwt });
}

module.exports = { showProfile };