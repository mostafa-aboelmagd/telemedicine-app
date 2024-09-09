

const express = require('express');
const medicalHistoryController = require('../../Controllers/Patirnt/MedicalHistory/Prescription');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('/prescription', tokenAuthentication, medicalHistoryController.getPrescription);
router.post('/prescription', tokenAuthentication, medicalHistoryController.addPrescription);
router.put('/prescription/:id', tokenAuthentication, medicalHistoryController.updatePrescription);
router.delete('/prescription/:id', tokenAuthentication, medicalHistoryController.deletePrescription);

module.exports = router;

