const  database  = require('../Database/doctorLogin');
const bcrypt = require('bcryptjs');
const { createToken } = require('../functions');
require('dotenv').config();

const showDoctorInfo = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.send('Please fill all the fields');
    }
    const doctor = await database.retrieveDoctor(email);
    if (!doctor) {
        return res.send('Invalid email or password');
    }
    const match = await bcrypt.compare(password, doctor[0].password_hash);
    if (!match) {
        return res.send('Invalid email or password');
    }
    const doctorInfo = await database.retrieveDoctorInfo(doctor[0].user_id);
    if (doctorInfo) {
        const token = createToken(doctor[0].user_id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
        return res.json(doctorInfo);
    }
    return res.send('Doctor not found');
}

module.exports = { showDoctorInfo};