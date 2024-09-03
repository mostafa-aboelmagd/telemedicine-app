const express = require('express');
const doctorAppointmentCreationController = require('../../Controllers/Appointment/doctorCreate');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.post('', tokenAuthentication, doctorAppointmentCreationController.createAppointment);

module.exports = router;