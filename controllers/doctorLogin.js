const  database  = require('../Database/doctorLogin');

const getDoctorById = async (req, res) => {
    const { id } = req.params;
    const doctor = await database.retrieveDoctorById(id);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Doctor not found');
}

module.exports = { getDoctorById};