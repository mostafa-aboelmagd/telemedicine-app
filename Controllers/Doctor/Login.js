const bcrypt = require('bcryptjs');
const database = require('../../Database/Doctor/Login');
const { createToken } = require('../../Utilities');
require('dotenv').config();
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send('Please fill all the fields');
    }
    const doctor = await database.retrieveDoctor(email);
    if (!doctor) {
        return res.status(401).send('Invalid email or password');
    }
    const match = await bcrypt.compare(password, doctor[0].password_hash);
    if (!match) {
        return res.status(402).send('Invalid email or password');
    }
    const token = createToken(doctor[0].user_id, doctor[0].email);
    if (!token) {
        return res.status(403).send('Token could not be created');
    }
    res.cookie('jwt', token, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
    return res.redirect('/doctor/profile');
}

module.exports = { login };