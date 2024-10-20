const express = require('express');
const chatController = require('../Controllers/Chat');
const { tokenAuthentication } = require('../Middleware/User/Authentication');

const router = express.Router();

router.get('', tokenAuthentication, chatController.getAppointmentChat);

module.exports = router;