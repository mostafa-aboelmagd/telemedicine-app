const express = require('express');
const doctorDeleteAppointmentController = require('../../../Controllers/Doctor/Appointment/delete');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');
const router = express.Router();

router.delete('', tokenAuthentication, doctorDeleteAppointmentController.deleteDoctorAppointment);

module.exports = router;