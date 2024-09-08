const { User } = require('../../classes');
const database = require('../../Database/Patient/Register');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const saltRounds = 15;

const patientRegister = async (req, res) => {
    const { fName, lName, email, password, gender, phone, birthYear } = req.body;
    if (fName && lName && email && password && gender && phone && role && birthYear) {
        const passwordFlag = passwordValidation(password);
        if (passwordFlag) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const role = 'Patient';
            const user = new User(fName, lName, email, hashedPassword, gender, phone, role, birthYear);
            const userFlag = await database.insertPatient(user);
            if (userFlag) {
                return res.redirect('/patient/login');
            } 
            return res.status(402).send('User already exists');
        }
        return res.status(401).send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    return res.status(400).send('Please fill all the fields');
}

module.exports = { patientRegister };