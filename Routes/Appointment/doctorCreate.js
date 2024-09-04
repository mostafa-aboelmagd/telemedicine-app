const express = require('express');
const doctorAppointmentCreateController = require('../../Controllers/Appointment/doctorCreate');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');
const router = express.Router();

router.post('', tokenAuthentication, doctorAppointmentCreateController.createAppointment);

module.exports = router;