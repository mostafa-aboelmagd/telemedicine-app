const  database  = require('../../Database/Patient/Edit');
const { passwordValidation } = require('../../Utilities');


const editInfo = async (req, res) => {
    const patientId = 22;
    const patientEmail = "john.doe@example.com";
    let message = '';
    if (!patientId) {
        message = 'Patient ID not found';
        return res.status(400).json({ message });
    }
    if (!patientEmail) {
        message = 'Patient email not found';
        return res.status(401).json({ message });
    }
    const { fName, lName, email, gender, phone, birthYear, languages } = req.body;
    const updatedInfo = {
        user_first_name: fName,
        user_last_name: lName,
        user_email: email,
        user_gender: gender,
        user_phone_number: phone,
        user_birth_year: birthYear,
        languages: languages
    };
    // if (email) {
    //     const emailFlag = database.checkUserEmail(email);
    //     if (emailFlag) {
    //         message = 'Email already exists';
    //         return res.status(402).json(message);
    //     }
    // }
    const patient = await database.updateInfo(patientId, patientEmail, updatedInfo);
    if (patient) {
        message = 'Patient info updated successfully';
        return res.json({ message, patient });
    }
    message = 'Could not update patient info';
    return res.status(403).json({ message });
}

const editPassword = async (req, res) => {
    const patientId = 22;
    const patientEmail = "john.doe@example.com";
    let message = '';
    if (!patientId) {
        return res.status(400).json(message);
    }
    if (!patientEmail) {
        message = 'Patient email not found';
        return res.status(401).json(message);
    }
    let { oldPassword , password, confirmPassword } = req.body;
    if (!oldPassword) {
        message = 'Please provide old password';
        return res.status(402).json({message});
    }
    if (!password) {
        message = 'Please provide new password';
        return res.status(403).json({message});
    }
    if (!confirmPassword) {
        message = 'Please confirm new password';
        return res.status(404).json({message});
    }
    if (password !== confirmPassword) {
        message = 'Passwords do not match';
        return res.status(405).json({message});
    }
    const passwordFlag = passwordValidation(confirmPassword);
    if (!passwordFlag) {
        message = 'Password must contain at least 8 characters, one number, one alphabet, and one special character';
        return res.status(406).json({message});
    }
    const patient = await database.updatePassword(patientId, patientEmail, oldPassword, confirmPassword);
    if (patient) {
        message = 'Patient password updated successfully';
        return res.json({ message, patient });
    }
    message = 'Could not update patient password';
    return res.status(407).json(message);
}

module.exports = { editInfo, editPassword };