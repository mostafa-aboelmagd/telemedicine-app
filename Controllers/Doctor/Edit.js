const  database  = require('../../Database/Doctor/Edit');
const { passwordValidation } = require('../../Utilities');


const editInfo = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    const { fName, lName, email, gender, phone, birthYear } = req.body;
    const updatedInfo = {
        user_first_name: fName,
        user_last_name: lName,
        user_email: email,
        user_gender: gender,
        user_phone_number: phone,
        user_birth_year: birthYear
    };
    if (email) {
        const emailFlag = database.checkUserEmail(email);
        if (emailFlag) {
            message = 'Email already exists';
            return res.status(402).json(message);
        }
    }
    const doctor = await database.updateInfo(doctorId, doctorEmail, updatedInfo);
    if (doctor) {
        message = 'Could not update doctor info';
        return res.status(403).json(message);
    }
    return res.json(doctor);
}

const editPassword = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    let message = '';
    if (!doctorId) {
        message = 'Doctor ID not found';
        return res.status(400).json(message);
    }
    if (!doctorEmail) {
        message = 'Doctor email not found';
        return res.status(401).json(message);
    }
    let { newPassword , oldPassword} = req.body;
    if (!oldPassword) {
        message = 'Please provide old password';
        return res.status(402).json(message);
    }
    if (!newPassword) {
        message = 'Please provide new password';
        return res.status(403).json(message);
    }
    const passwordFlag = passwordValidation(newPassword);
    if (!passwordFlag) {
        message = 'Password must contain at least 8 characters, one number, one alphabet, and one special character';
        return res.status(404).json(message);
    }
    const doctor = await database.updatePassword(doctorId, doctorEmail, oldPassword, newPassword);
    if (!doctor) {
        message = 'Could not update doctor password';
        return res.status(405).json(message);
    }
    return res.json(doctor);
}

module.exports = { editInfo, editPassword };