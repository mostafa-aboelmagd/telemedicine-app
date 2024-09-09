const express = require('express');
const patientHistoryAddPrescriptionController = require('../../Controllers/Patirnt/MedicalHistory/addPrescription');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.post('/prescription', tokenAuthentication, patientHistoryAddPrescriptionController.addPrescription);

module.exports = router;