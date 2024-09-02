const express = require('express');
const patientProfileController = require('../../Controllers/Patient/Profile');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('', tokenAuthentication, patientProfileController.showProfile);

module.exports = router;