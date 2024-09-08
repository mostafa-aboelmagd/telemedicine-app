const express = require('express');
const doctorProfileController = require('../../Controllers/Doctor/Profile');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('/info', doctorProfileController.doctorInfo);
router.get('/patients', doctorProfileController.doctorPatients);
router.get('/appointments', doctorProfileController.doctorAppointments);
router.get('/availabilities', doctorProfileController.doctorAvailabilities);
router.get('/experience', doctorProfileController.doctorExperience);
router.get('/education', doctorProfileController.doctorEducation);
router.get('/reviews', doctorProfileController.doctorReviews);
router.get('/interests', doctorProfileController.doctorInterests);
router.get('/languages', doctorProfileController.doctorLanguages);


module.exports = router;