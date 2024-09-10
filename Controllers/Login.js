const bcrypt = require('bcryptjs');
const database = require('../Database/Login');
const { createToken } = require('../Utilities');
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
    const user = await database.retrieveUser(email);
    if (!user) {
        message = 'Invalid email or password'
        return res.status(400).json(message);
    }
    console.log('User retrieved:', user);
    const match = await bcrypt.compare(password, user[0].user_password_hash);
    console.log('Password match result:', match); 
    if (!match) {
        message = 'Invalid email or password'
        return res.status(400).json(message);
    }
    const token = createToken(user[0].user_id, user[0].user_email, user[0].user_role);
    if (!token) {
        message = 'Token could not be created';
        return res.status(400).json(message);
    }
    res.cookie('jwt', token, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
    return res.json({ message: 'Login successful', token: token });
}

module.exports = { login };