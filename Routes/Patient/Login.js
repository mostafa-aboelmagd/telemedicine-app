const express = require('express');
const patientLoginController = require('../../Controllers/Patient/Login');
const router = express.Router();

router.get('', patientLoginController.login);

module.exports = router;
