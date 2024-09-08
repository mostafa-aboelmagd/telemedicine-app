const express = require('express');
const doctorAddAvailabilityController = require('../../../Controllers/Doctor/Availability/add');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');

const router = express.Router();

router.post('', doctorAddAvailabilityController.addAvailability);

module.exports = router;