const { User } = require('../classes');
const database = require('../Database/patientRegister');
const bcrypt = require('bcryptjs');
const { passwordValidation, createToken } = require('../functions');
require('dotenv').config();

const saltRounds = 15;

const patientRegister = async (req, res) => {
    const { fName, lName, email, password, gender, phone, role, birthYear } = req.body;
    if (fName && lName && email && password && gender && phone && role && birthYear) {
        const passwordFlag = passwordValidation(password);
        if (passwordFlag) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = new User(fName, lName, email, hashedPassword, gender, phone, role, birthYear);
            const userFlag = await database.insertUser(user);
            if (userFlag) {
                const token = createToken(userFlag[0].user_id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
                return res.send('User registered successfully');
            } 
            return res.send('User already exists');
        }
        return res.send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    return res.send('Please fill all the fields');
}

module.exports = { patientRegister };