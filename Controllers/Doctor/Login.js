const bcrypt = require('bcryptjs');
const database = require('../../Database/Doctor/Login');
const { createToken } = require('../../Utilities');
require('dotenv').config();
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let message = '';
    if (!email || !password) {
        message = 'Please fill all the fields';
        return res.status(404).json(message);
    }
    const doctor = await database.retrieveDoctor(email);
    if (!doctor) {
        message = 'Invalid email or password'
        return res.status(400).json(message);
    }
    console.log('Doctor retrieved:', doctor);
    const match = await bcrypt.compare(password, doctor[0].user_password_hash);
    console.log('Password match result:', match); 
    if (!match) {
        message = 'Invalid email or password'
        return res.status(400).json(message);
    }
    const token = createToken(doctor[0].user_id, doctor[0].user_email);
    if (!token) {
        message = 'Token could not be created';
        return res.status(400).json(message);
    }
    res.cookie('jwt', token, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
    return res.json({ message: 'Login successful', token: token });
}

module.exports = { login };