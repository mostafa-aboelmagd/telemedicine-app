const express = require('express');
const doctorLoginController = require('../controllers/doctorLogin');

const router = express.Router();

router.get('/:id', doctorLoginController.getDoctorById);

module.exports = router;