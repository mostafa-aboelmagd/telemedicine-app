const express = require('express');
const patientAppointmentBookController = require('../../../Controllers/Patient/Appointment/Book');
const patientGetAvailabilitiesController = require('../../../Controllers/Patient/Appointment/patientGetAvailabilities');

const { tokenAuthentication } = require('../../../Middleware/User/Authentication');
const router = express.Router();

router.post('/book', tokenAuthentication, patientAppointmentBookController.bookAppointment);
router.get('/Availabilities/:doctorId',tokenAuthentication, patientGetAvailabilitiesController.patientGetAvailabilities);

module.exports = router;