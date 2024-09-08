const express = require('express');
const doctorDeleteAvailabilityController = require('../../../Controllers/Doctor/Availability/Delete');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');

const router = express.Router();

router.delete('', doctorDeleteAvailabilityController.deleteAvailability);

module.exports = router;