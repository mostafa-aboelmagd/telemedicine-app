const database = require('../../Database/Patient/Home');

const home = async (req, res) => {
    // const patientUserId = req.id;
    // const patientEmail = req.email;
    let message = '';
    // if (!patientUserId) {
    //     message = 'Patient ID not found';
    //     return res.status(404).json(message);
    // }
    // if (!patientEmail) {
    //     message = 'Patient email not found';
    //     return res.status(404).json(message);
    // }
    // const patient = await database.retrievePatient(patientUserId, patientEmail);
    // if (!patient) {
    //     message = 'Patient is not registered';
    //     return res.status(400).json(message);
    // }
    const databaseDoctors = await database.retrieveDoctors();
    if (!databaseDoctors) {
        message = 'Could not retrieve doctors';
        return res.status(400).json(message);
    }
    const groupedData = databaseDoctors.reduce((acc, doctor) => {
        const { user_id, user_first_name, user_last_name, user_gender, doctor_specialization, doctor_country, doctor_thirty_min_price, doctor_sixty_min_price, doctor_image, doctor_interest_name, language } = doctor;
        if (!acc[user_id]) {
            acc[user_id] = {
            id: user_id.toString(),
            name: `Dr. ${user_first_name} ${user_last_name}`,
            nearestApp: new Date(),
            title: doctor_specialization,
            rating: 0,
            numSessions: 0,
            numReviews: 0,
            fees60min: doctor_sixty_min_price,
            fees30min: doctor_thirty_min_price,
            image: doctor_image,
            interests: [],
            country: doctor_country,
            language: [],
            gender: user_gender,
            isOnline: "true"
            };
        }
        if (!acc[user_id].interests.includes(doctor_interest_name)) {
            acc[user_id].interests.push(doctor_interest_name);
        }
        if (!acc[user_id].language.includes(language)) {
            acc[user_id].language.push(language);
        }
        return acc;
        }, {});
    const doctors = Object.values(groupedData);
    return res.json(doctors);
};

module.exports = { home };