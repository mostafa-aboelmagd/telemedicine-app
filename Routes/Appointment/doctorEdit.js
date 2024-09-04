const express = require('express');
const doctorEditAppointmentController = require('../../Controllers/Appointment/doctorEdit');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');
const router = express.Router();

router.put('', tokenAuthentication, doctorEditAppointmentController.editDoctorAppointment);

module.exports = router;