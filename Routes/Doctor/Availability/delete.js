const express = require('express');
const doctorDeleteAvailabilityController = require('../../../Controllers/Doctor/Availability/delete');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');

const router = express.Router();

router.delete('', tokenAuthentication, doctorDeleteAvailabilityController.deleteAvailability);

module.exports = router;