const express = require('express');
const patientEditController = require('../../Controllers/Patient/Edit');
const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.put('/info', patientEditController.editInfo);
router.put('/password', patientEditController.editPassword);

module.exports = router;