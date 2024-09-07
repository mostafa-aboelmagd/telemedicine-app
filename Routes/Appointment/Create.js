const express = require('express');
const appointmentCreationController = require('../../Controllers/Appointment/Create');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.post('', tokenAuthentication, appointmentCreationController.createAppointment);

module.exports = router;