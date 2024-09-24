const express = require('express');
const patientAppointmentBookController = require('../../../Controllers/Patient/Appointment/Book');
const patientGetAvailabilitiesController = require('../../../Controllers/Patient/Appointment/patientGetAvailabilities');
const patientGetAppointmentsHistoryController = require('../../../Controllers/Patient/Appointment/appointmentsHistory');
const GetDetailsController = require('../../../Controllers/Patient/Appointment/appointmentDetails');

const { tokenAuthentication } = require('../../../Middleware/User/Authentication');
const router = express.Router();


router.post('/book', tokenAuthentication, patientAppointmentBookController.bookAppointment);
router.get('/appointmentsHistory', tokenAuthentication, patientGetAppointmentsHistoryController.appointmentsHistory);
router.get('/Availabilities/:doctorId',tokenAuthentication, patientGetAvailabilitiesController.patientGetAvailabilities);
router.get('/appointmentdetails/:appointmentId', tokenAuthentication, GetDetailsController.AppointmentDetails);

module.exports = router;