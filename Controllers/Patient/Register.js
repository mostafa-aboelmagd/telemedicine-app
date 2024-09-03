const { User } = require('../../classes');
const database = require('../../Database/Patient/Register');
const { passwordValidation } = require('../../Utilities');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const saltRounds = 15;

const patientRegister = async (req, res) => {
    let message = '';
    const { fName, lName, email, password, gender, phone, birthYear } = req.body;
    if (fName && lName && email && password && gender && phone && birthYear) {
        const passwordFlag = passwordValidation(password);
        if (passwordFlag) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const role = 'Patient';
            const user = new User(fName, lName, email, hashedPassword, gender, phone, role, birthYear);
            const [userFlag, patientFlag] = await database.insertPatient(user);
            if (userFlag) {
                console.log('User created');
                if (patientFlag) {
                    console.log('Patient created');
                    return res.json({ user: userFlag, patient: patientFlag });
                }
                message = 'Could not create patient';
                return res.status(403).json(message);
            }
            message = 'User already exists';
            return res.status(402).json(message);
        }
        message = 'Password must contain at least 8 characters, one number, one alphabet, and one special character';
        return res.status(401).json(message);
    }
    message = 'Please fill all the fields';
    return res.status(400).json(message);
}

module.exports = { patientRegister };