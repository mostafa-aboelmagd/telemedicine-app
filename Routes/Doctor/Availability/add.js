const express = require('express');
const doctorAddAvailabilityController = require('../../../Controllers/Doctor/Availability/Add');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');

const router = express.Router();

router.post('', doctorAddAvailabilityController.addAvailability);

module.exports = router;