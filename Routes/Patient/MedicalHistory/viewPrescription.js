

const express = require('express');
const patientHistoryViewPrescriptionController = require('../../Controllers/Patirnt/MedicalHistory/viewPrescription');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('/prescription', tokenAuthentication, patientHistoryDeletePrescriptionController.getPrescription);

module.exports = router;