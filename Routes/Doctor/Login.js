const express = require('express');
const doctorLoginController = require('../../Controllers/Doctor/Login');

const router = express.Router();

router.get('', doctorLoginController.login);

module.exports = router;