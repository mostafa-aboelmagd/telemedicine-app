const  database  = require('../../Database/Doctor/Edit');
const { passwordValidation, dateValidation } = require('../../Utilities');


const editDoctorInfo = async (req, res) => {
    const doctorId = req.id;
    if (!doctorId) {
        return res.send('Doctor ID not found');
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
    const doctor = await database.updateDoctorInfo(doctorId, updatedInfo);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Could not update doctor info');
}

const editDoctorPassword = async (req, res) => {
    const doctorId = req.id;
    if (!doctorId) {
        return res.send('Doctor ID not found');
    }
    let { newPassword , oldPassword} = req.body;
    if (!newPassword || !oldPassword) {
        return res.send('Please provide both old and new passwords');
    }
    const passwordFlag = passwordValidation(newPassword);
    if (!passwordFlag) {
        return res.send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    const doctor = await database.updateDoctorPassword(doctorId, oldPassword, newPassword);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Could not update doctor password');
}

const editDoctorAvailability = async (req, res) => {
    const doctorId = req.id;
    if (!doctorId) {
        return res.send('Doctor ID not found');
    }
    let { availability, status } = req.body;
    if (!availability) {
        return res.send('Please provide availability');
    }
    const availabilityFlag = dateValidation(availability);
    if (!availabilityFlag) {
        return res.send('Invalid availability format or date and time');
    }
    if (status !== 'available' && status !== 'unavailable') {
        return res.send('Please provide status as available or unavailable');
    }
    if (status === 'unavailable') {
        status = false;
    } else {
        status = true;
    }
    const doctor = await database.updateDoctorAvailability(doctorId, availability, status);
    if (doctor) {
        return res.json(doctor);
    }
    return res.send('Could not update doctor availability');
}

module.exports = { editDoctorInfo, editDoctorPassword, editDoctorAvailability };