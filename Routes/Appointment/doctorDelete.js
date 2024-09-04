const express = require('express');
const doctorDeleteAppointmentController = require('../../Controllers/Appointment/doctorDelete');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');
const router = express.Router();

router.delete('', tokenAuthentication, doctorDeleteAppointmentController.deleteDoctorAppointment);

module.exports = router;