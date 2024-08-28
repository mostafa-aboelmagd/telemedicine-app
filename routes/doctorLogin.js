const express = require('express');
const doctorLoginController = require('../controllers/doctorLogin');

const router = express.Router();

router.get('/id/:id', doctorLoginController.getDoctorById);
router.get('/name/:name', doctorLoginController.getDoctorsByName);

module.exports = router;