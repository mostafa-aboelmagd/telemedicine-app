const express = require('express');
const doctorAppointmentCreateController = require('../../../Controllers/Doctor/Appointment/create');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');
const router = express.Router();

router.post('', tokenAuthentication, doctorAppointmentCreateController.createAppointment);

module.exports = router;