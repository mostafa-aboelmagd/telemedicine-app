const express = require('express');
const patientAppointmentBookController = require('../../../Controllers/Patient/Appointment/book');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');
const router = express.Router();

router.put('', tokenAuthentication, patientAppointmentBookController.bookAppointment);

module.exports = router;