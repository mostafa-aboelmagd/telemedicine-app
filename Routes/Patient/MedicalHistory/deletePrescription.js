

const express = require('express');
const patientHistoryDeletePrescriptionController = require('../../Controllers/Patirnt/MedicalHistory/deletePrescription');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();
router.delete('/prescription/:id', tokenAuthentication, patientHistoryDeletePrescriptionController.deletePrescription);

module.exports = router;