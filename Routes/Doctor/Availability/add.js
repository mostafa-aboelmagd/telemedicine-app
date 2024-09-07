const express = require('express');
const doctorAddAvailabilityController = require('../../../Controllers/Doctor/Availability/Add');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');

const router = express.Router();

router.post('', doctorAddAvailabilityController.addAvailability);
router.get('', doctorAddAvailabilityController.getAllAvailabilities);

module.exports = router;