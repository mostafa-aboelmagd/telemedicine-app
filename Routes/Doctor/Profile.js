const express = require('express');
const doctorProfileController = require('../../Controllers/Doctor/Profile');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('/info', tokenAuthentication, doctorProfileController.doctorInfo);
router.get('/patients', tokenAuthentication, doctorProfileController.doctorPatients);
router.get('/appointments', tokenAuthentication, doctorProfileController.doctorAppointments);
// router.get('/availabilities', tokenAuthentication, doctorProfileController.doctorAvailabilities);
router.get('/experience', tokenAuthentication, doctorProfileController.doctorExperience);
router.get('/education', tokenAuthentication, doctorProfileController.doctorEducation);
router.get('/reviews', tokenAuthentication, doctorProfileController.doctorReviews);
router.get('/interests', tokenAuthentication, doctorProfileController.doctorInterests);
router.get('/PendingRequests', tokenAuthentication, doctorProfileController.doctorPendingRequests);


module.exports = router;