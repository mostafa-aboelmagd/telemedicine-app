const  database  = require('../../Database/Patient/Profile');

const showProfile = async (req, res) => {
    const patientUserId = req.id;
    const patientEmail = req.email;
    if (!patientUserId) {
        return res.status(400).send('Patient ID not found');
    }
    if (!patientEmail) {
        return res.status(401).send('Patient email not found');
    }
    const patient = await database.retrievePatientInfo(patientUserId);
    if (!patient) {
        return res.status(402).send('Could not retrieve patient info');
    }
    return res.json({ patient: patient, token: req.cookies.jwt });
}

module.exports = { showProfile };