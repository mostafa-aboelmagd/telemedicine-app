const express = require('express');
const doctorProfileController = require('../../Controllers/Doctor/Profile');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('', tokenAuthentication, doctorProfileController.showProfile);

module.exports = router;