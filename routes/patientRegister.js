const express = require('express');
const registerController = require('../controllers/patientRegister');

const router = express.Router();

router.post('', registerController.patientRegister);

module.exports = router;