const express = require('express');
const resetPasswordController = require('../Controllers/Reset_Password');
const { tokenAuthentication } = require('../Middleware/User/Authentication');


const router = express.Router();

router.post('/send-reset-email', resetPasswordController.sendResetEmail);
router.put('/reset-password', tokenAuthentication, resetPasswordController.resetPassword);

module.exports = router;