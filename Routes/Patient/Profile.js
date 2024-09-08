const express = require('express');
const patientProfileController = require('../../Controllers/Patient/Profile');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('/info', patientProfileController.patientInfo);
router.get('/appointments', patientProfileController.patientAppointments);
router.get('/doctors', patientProfileController.patientDoctors);
router.get('/reviews', patientProfileController.patientReviews);
router.get('/languages', patientProfileController.patientLanguages);

module.exports = router;