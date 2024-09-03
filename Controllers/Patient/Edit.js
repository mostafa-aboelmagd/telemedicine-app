const  database  = require('../../Database/Patient/Edit');
const { passwordValidation } = require('../../Utilities');


const editInfo = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    let message = '';
    if (!patientId) {
        message = 'Patient ID not found';
        return res.status(400).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
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
    const patient = await database.updateInfo(patientId, patientEmail, updatedInfo);
    if (patient) {
        return res.json(patient);
    }
    message = 'Could not update patient info';
    return res.status(403).json(message);
}

const editPassword = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    let message = '';
    if (!patientId) {
        return res.status(400).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
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
    const patient = await database.updatePassword(patientId, patientEmail, oldPassword, newPassword);
    if (patient) {
        return res.json(patient);
    }
    message = 'Could not update patient password';
    return res.status(405).json(message);
}

module.exports = { editInfo, editPassword };