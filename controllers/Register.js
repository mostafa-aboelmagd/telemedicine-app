const { User } = require('../classes');
const { insertUser } = require('../Database/Register');
const bcrypt = require('bcrypt');
const { passwordValidation } = require('../functions');

const saltRounds = 15;

const patientRegister = async (req, res) => {
    const { fName, lName, email, password, gender, phone, role, birthYear } = req.body;
    if (fName && lName && email && password && gender && phone && role && birthYear) {
        const passwordFlag = passwordValidation(password);
        if (passwordFlag) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = new User(fName, lName, email, hashedPassword, gender, phone, role, birthYear);
            const userFlag = await insertUser(user);
            if (userFlag) {
                return res.send('User registered successfully');
            } 
            return res.send('User already exists');
        }
        return res.send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    return res.send('Please fill all the fields');
}

module.exports = { patientRegister };