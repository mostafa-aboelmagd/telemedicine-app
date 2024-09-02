const express = require('express');
const doctorEditController = require('../../Controllers/Doctor/Edit');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.put('/info', tokenAuthentication, doctorEditController.editDoctorInfo);
router.put('/password', tokenAuthentication, doctorEditController.editDoctorPassword);
router.put('/availability', tokenAuthentication, doctorEditController.editDoctorAvailability);

module.exports = router;