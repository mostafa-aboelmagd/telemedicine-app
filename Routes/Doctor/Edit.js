const express = require('express');
const doctorEditController = require('../../Controllers/Doctor/Edit');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');
const router = express.Router();

router.put('/info', doctorEditController.editInfo);
router.put('/password', doctorEditController.editPassword);
// router.get('/info', doctorEditController.getDoctorInfo);
// router.get('/password', doctorEditController.getDoctorPassword);

module.exports = router;