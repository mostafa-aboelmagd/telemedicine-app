const express = require('express');
const doctorEditAvailabilityController = require('../../../Controllers/Doctor/Availability/edit');
const { tokenAuthentication } = require('../../../Middleware/User/Authentication');
const router = express.Router();

router.put('', tokenAuthentication, doctorEditAvailabilityController.editAvailability);

module.exports = router;