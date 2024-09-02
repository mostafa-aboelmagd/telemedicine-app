const  database  = require('../../Database/Doctor/Edit');
const { passwordValidation, dateValidation } = require('../../Utilities');


const editInfo = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    if (!doctorId) {
        return res.status(400).send('Doctor ID not found');
    }
    if (!doctorEmail) {
        return res.status(401).send('Doctor email not found');
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
    const doctor = await database.updateInfo(doctorId, doctorEmail, updatedInfo);
    if (doctor) {
        return res.json(doctor);
    }
    return res.status(402).send('Could not update doctor info');
}

const editPassword = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    if (!doctorId) {
        return res.status(400).send('Doctor ID not found');
    }
    if (!doctorEmail) {
        return res.status(401).send('Doctor email not found');
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
        return res.status(404).send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    const doctor = await database.updatePassword(doctorId, doctorEmail, oldPassword, newPassword);
    if (doctor) {
        return res.json(doctor);
    }
    return res.status(405).send('Could not update doctor password');
}

const editAvailability = async (req, res) => {
    const doctorId = req.id;
    const doctorEmail = req.email;
    if (!doctorId) {
        return res.status(400).send('Doctor ID not found');
    }
    if (!doctorEmail) {
        return res.status(401).send('Doctor email not found');
    }
    let { availability, status } = req.body;
    if (!availability) {
        return res.status(402).send('Please provide availability');
    }
    const availabilityFlag = dateValidation(availability);
    if (!availabilityFlag) {
        return res.status(403).send('Invalid availability format or date and time');
    }
    if (status !== 'available' && status !== 'unavailable') {
        return res.status(404).send('Please provide status as available or unavailable');
    }
    if (status === 'unavailable') {
        status = false;
    } else {
        status = true;
    }
    const doctor = await database.updateAvailability(doctorId, doctorEmail, availability, status);
    if (doctor) {
        return res.json(doctor);
    }
    return res.status(405).send('Could not update doctor availability');
}

module.exports = { editInfo, editPassword, editAvailability };