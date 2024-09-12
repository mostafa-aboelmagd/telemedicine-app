const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_EXPIRATION_IN_DAYS, ACCESS_TOKEN_SECRET_KEY } = process.env;

const passwordValidation = (str) => {
    const hasNumbers = /\d/.test(str);
    const hasAlphabets = /[a-zA-Z]/.test(str);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(str);

    return hasNumbers && hasAlphabets && hasSpecialChars && str.length >= 8;
}

const splitAndToLower = (str) => {
    const [str_1, str_2] = str.split(' ');
    if (str_1 && str_2) {
        return [str_1.toLowerCase(), str_2.toLowerCase()];
    }
    return [str_1 ? str_1.toLowerCase() : '', str_2 ? str_2.toLowerCase() : ''];
}

const createToken = (id, email, role) => {
    if (!id || !email || !role) {
        console.log('Please provide an id and an email and a role.');
        return false;
    }
    return jwt.sign({ id, email, role }, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRATION_IN_DAYS
    });
}

const createAppointmentToken = (patientId, doctorId) => {
    return jwt.sign({ patientId, doctorId }, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRATION_IN_DAYS
    });
}

const dateValidation = (date) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
        console.log('Invalid date format. Please provide a valid date and time.');
        return false;
    }
    const currentDate = new Date();
    const sixHoursLater = new Date(currentDate.getTime() + 6 * 60 * 60 * 1000);
    if (dateObj <= sixHoursLater) {
        console.log('Date must be at least 6 hours in the future.');
        return false;
    }
    return true;
}
//prescription validation by  yahya 
const validatePrescriptionData = (medicationData) => {
    // Check if medicationData is an array
    if (!Array.isArray(medicationData)) {
      return false;
    }
  
    // Validate each medication object
    for (const medication of medicationData) {
      if (!medication.medicationName || typeof medication.medicationName !== 'string') {
        return false;
      }
      if (!medication.dosage || typeof medication.dosage !== 'string') {
        return false;
      }
    }
  
    return true;
  };



  function mapPrescriptionData(prescriptionData) {
    return prescriptionData.map(prescription => ({
      mid: prescription.prescription_id,
      doctorName: `${prescription.user_first_name} ${prescription.user_last_name}`,
      doctorImage: "/assets/doctorM.jpg", // Replace with actual image URL
      visitDate: new Date(prescription.prescriptions_appointment_id).toISOString().slice(0, 10),
      specialty: prescription.doctor_specialization,
      medicationList: prescription.medications.map(medication => ({
        id: medication.prescription_medication_reference_id,
        name: medication.prescription_medication_name,
        dose: medication.prescription_medications_dosage,
        frequency: medication.prescription_medications_dosage.split(' ')[1],
        start: new Date(prescription.created_at).toISOString().slice(0, 10),
        end: medication.prescription_medications_end_date || null
      }))
    }));
  }


module.exports = { passwordValidation, splitAndToLower, createToken, createAppointmentToken, dateValidation,validatePrescriptionData,mapPrescriptionData};
