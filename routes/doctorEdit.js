const express = require('express');
const doctorEditController = require('../controllers/doctorEdit');
const { tokenAuthentication } = require('../middleware/doctorAuthentication');

const router = express.Router();

router.put('/info', tokenAuthentication, doctorEditController.editDoctorInfo);
router.put('/password', tokenAuthentication, doctorEditController.editDoctorPassword);

module.exports = router;