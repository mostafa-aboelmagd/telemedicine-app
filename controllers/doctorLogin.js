const  database  = require('../Database/doctorLogin');
const {splitAndToLower} = require('../functions');

const getDoctorById = async (req, res) => {
    const { id } = req.params;
    const doctor = await database.retrieveDoctorById(id);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Doctor not found');
}

const getDoctorsByName = async (req, res) => {
    const { name } = req.params;
    const [fname, lname] = splitAndToLower(name);
    if (!fname || !lname) {
        return res.send('Please provide both first name and last name');
    }
    const doctor = await database.retrieveDoctorsByName(fname, lname);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Doctor not found');
}

const getDoctorsBySpecialization = async (req, res) => {
    const { specialization } = req.params;
    const doctor = await database.retrieveDoctorsBySpecialization(specialization);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Doctor not found');
}

module.exports = { getDoctorById, getDoctorsByName, getDoctorsBySpecialization };