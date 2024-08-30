const express = require('express');
const doctorLoginController = require('../controllers/doctorLogin');

const router = express.Router();

router.get('', doctorLoginController.showDoctorInfo);

module.exports = router;