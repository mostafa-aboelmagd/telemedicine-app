const  database  = require('../../Database/Patient/Profile');

const patientInfo = async (req, res) => {
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
    return res.json(patient);
};

const patientAppointments = async (req, res) => {
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
    const appointments = await database.retrievePatientAppointments(patientUserId, patientEmail);
    if (!appointments) {
        message = 'Could not retrieve patient appointments';
        return res.status(402).json(message);
    }
    return res.json(appointments);
};

const patientDoctors = async (req, res) => {
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
    const doctors = await database.retrievePatientDoctors(patientUserId, patientEmail);
    if (!doctors) {
        message = 'Could not retrieve patient doctors';
        return res.status(402).json(message);
    }
    return res.json(doctors);
};

const patientReviews = async (req, res) => {
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
    const reviews = await database.retrievePatientReviews(patientUserId, patientEmail);
    if (!reviews) {
        message = 'Could not retrieve reviews';
        return res.status(402).json(message);
    }
    return res.json(reviews);
};

const patientLanguages = async (req, res) => {
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
    const languages = await database.retrievePatientLanguages(patientUserId, patientEmail);
    if (!languages) {
        message = 'Could not retrieve patient languages';
        return res.status(402).json(message);
    }
    return res.json(languages);
}

module.exports = { patientInfo, patientAppointments, patientDoctors, patientReviews, patientLanguages };