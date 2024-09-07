const  database  = require('../../Database/Patient/Edit');
const { passwordValidation } = require('../../Utilities');


const editInfo = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    if (!patientId) {
        return res.status(400).send('Patient ID not found');
    }
    if (!patientEmail) {
        return res.status(401).send('Patient email not found');
    }
    const { fName, lName, email, gender, phone, birthYear } = req.body;
    const updatedInfo = {
        first_name: fName,
        last_name: lName,
        email: email,
        gender: gender,
        phone_number: phone,
        birth_year: birthYear
    };
    const patient = await database.updateInfo(patientId, updatedInfo);
    if (patient) {
        return res.json(patient);
    }
    return res.status(402).send('Could not update patient info');
}

const editPassword = async (req, res) => {
    const patientId = req.id;
    const patientEmail = req.email;
    if (!patientId) {
        return res.status(400).send('Patient ID not found');
    }
    if (!patientEmail) {
        return res.status(401).send('Patient email not found');
    }
    let { newPassword , oldPassword} = req.body;
    if (!oldPassword) {
        return res.status(402).send('Please provide old password');
    }
    if (!newPassword) {
        return res.status(403).send('Please provide new password');
    }
    const passwordFlag = passwordValidation(newPassword);
    if (!passwordFlag) {
        return res.status(405).send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    const patient = await database.updatePassword(patientId, oldPassword, newPassword);
    if (patient) {
        return res.json(patient);
    }
    return res.status(406).send('Could not update patient password');
}

module.exports = { editInfo, editPassword };