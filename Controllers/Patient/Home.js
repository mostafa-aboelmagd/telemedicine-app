const database = require('../../Database/Patient/Home');

const home = async (req, res) => {
    // const patientUserId = req.id;
    // const patientEmail = req.email;
    // let message = '';
    // if (!patientUserId) {
    //     message = 'Patient ID not found';
    //     return res.status(400).json(message);
    // }
    // if (!patientEmail) {
    //     message = 'Patient email not found';
    //     return res.status(401).json(message);
    // }
    // const home = await database.retrievePatient(patientUserId, patientEmail);
    // if (!home) {
    //     message = 'Patient is not registered';
    //     return res.status(402).json(message);
    // }
    const databaseDoctors = await database.retrieveDoctors();
    if (!databaseDoctors) {
        message = 'Could not retrieve doctors';
        return res.status(403).json(message);
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
            image: null,
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



const doctors = [
    { id: "1", name: "Dr. Ahmed Ali", nearestApp: new Date("2024-08-31"), title: "Psychiatrist", rating: 4.2, numSessions: 825, numReviews: 860, fees60min: 200, fees30min: 100, image: "/assets/doctorM.jpg", interests: ["Separation Anxiety Disorder, Generalized Anxiety Disorder, and Social Phobia", "Relations"], country: "Egypt", language: ["Arabic", "Mandarin"], gender: "Male", isOnline: "true" },
    { id: "2", name: "Dr. Mona Aldahan", nearestApp: new Date("2024-09-01"), title: "Gynecologist", rating: 3.9, numSessions: 900, numReviews: 950, fees60min: 250, fees30min: 125, image: "/assets/doctorF.jpg", interests: ["Prenatal Care", "Reproductive Health", "Menopause"], country: "Saudi Arabia", language: ["Arabic", "Mandarin"], gender: "Female", isOnline: "false" },
    { id: "3", name: "Dr. Amina Sameeh", nearestApp: new Date("2024-09-02"), title: "Ophthalmologist", rating: 3.4, numSessions: 780, numReviews: 800, fees60min: 220, fees30min: 110, image: "/assets/doctorF.jpg", interests: ["Cataract Surgery", "Glaucoma", "Vision Correction"], country: "Kuwait", language: ["English", "Mandarin"], gender: "Female", isOnline: "false" },
    { id: "4", name: "Dr. Mohammed Mamdouh", nearestApp: new Date("2024-09-03"), title: "Plastic Surgeon", rating: 4.8, numSessions: 650, numReviews: 700, fees60min: 300, fees30min: 150, image: "/assets/doctorM.jpg", interests: ["Cosmetic Surgery", "Reconstructive Surgery", "Burn Treatment"], country: "Qatar", language: ["English", "Mandarin"], gender: "Male", isOnline: "true" },
    { id: "5", name: "Dr. Yousef Karim", nearestApp: new Date("2024-09-04"), title: "Cardiologist", rating: 2.9, numSessions: 1000, numReviews: 1050, fees60min: 280, fees30min: 140, image: "/assets/doctorM.jpg", interests: ["Heart Disease", "Hypertension", "Cardiac Rehabilitation"], country: "Yemen", language: ["Arabic", "Mandarin"], gender: "Male", isOnline: "false" },
    { id: "6", name: "Dr. Omar Tareq", nearestApp: new Date("2024-09-05"), title: "Dermatologist", rating: 2.4, numSessions: 850, numReviews: 900, fees60min: 230, fees30min: 115, image: "/assets/doctorM.jpg", interests: ["Skin Cancer", "Acne", "Eczema"], country: "Germany", language: ["German", "Mandarin"], gender: "Male", isOnline: "true" },
    { id: "7", name: "Dr. Ayah Lotfy", nearestApp: new Date("2024-09-06"), title: "Neurologist", rating: 1.9, numSessions: 720, numReviews: 750, fees60min: 260, fees30min: 130, image: "/assets/doctorF.jpg", interests: ["Epilepsy", "Stroke", "Multiple Sclerosis"], country: "Morocco", language: ["English", "Mandarin"], gender: "Female", isOnline: "false" },
    { id: "8", name: "Dr. Mostafa Barakat", nearestApp: new Date("2024-09-07"), title: "Orthopedic Surgeon", rating: 4.6, numSessions: 680, numReviews: 700, fees60min: 270, fees30min: 135, image: "/assets/doctorM.jpg", interests: ["Joint Replacement", "Sports Injuries", "Fracture Treatment"], country: "Morocco", language: ["Arabic", "Mandarin"], gender: "Male", isOnline: "true" },
    { id: "9", name: "Dr. Mohsen Hassan", nearestApp: new Date("2024-09-08"), title: "Pediatrician", rating: 1.4, numSessions: 950, numReviews: 1000, fees60min: 210, fees30min: 105, image: "/assets/doctorM.jpg", interests: ["Child Development", "Vaccinations", "Pediatric Nutrition"], country: "Egypt", language: ["English", "Mandarin"], gender: "Male", isOnline: "true" },
    { id: "10", name: "Dr. Sama Yehya", nearestApp: new Date("2024-09-09"), title: "Endocrinologist", rating: 0.9, numSessions: 800, numReviews: 850, fees60min: 240, fees30min: 120, image: "/assets/doctorF.jpg", interests: ["Diabetes", "Thyroid Disorders", "Hormonal Imbalances"], country: "Kuwait", language: ["Arabic", "Mandarin"], gender: "Female", isOnline: "false" }
];