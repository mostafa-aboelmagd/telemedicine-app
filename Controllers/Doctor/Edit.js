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
        return res.json(doctor);
    }
    message = 'Could not update doctor info';
    return res.status(403).json(message);
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
    if (doctor) {
        return res.json(doctor);
    }
    message = 'Could not update doctor password';
    return res.status(405).json(message);
}

const editAvailability = async (req, res) => {
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
    const { availabilityDay, availabilityHour, availabilityId } = req.body;
    if (!availabilityDay) {
        message = 'Please provide availability day';
        return res.status(402).json(message);
    }
    if (!availabilityHour) {
        message = 'Please provide availability hour';
        return res.status(403).json(message);
    }
    if (!availabilityId) {
        message = 'Please provide availability ID';
        return res.status(404).json(message);
    }
    const doctorAvailability = await database.updateAvailability(doctorId, availabilityDay, availabilityHour, availabilityId);
    if (doctorAvailability) {
        message = 'Doctor availability is successfully updated';
        return res.json(message, doctorAvailability);
    }
    message = 'Could not update doctor availability';
    return res.status(405).json(message);
}

module.exports = { editInfo, editPassword, editAvailability };