const express = require("express");
const backOfficeController = require("../../Controllers/backOffice/backOfficeController");
const { tokenAuthentication } = require("../../Middleware/User/Authentication");

const router = express.Router();

router.get("/", tokenAuthentication);

router.get("/getAllPatients", backOfficeController.getAllPatients);
router.get("/getPatient", backOfficeController.getPatientInfo);
router.Patch("/changePatientState", backOfficeController.changePersonState);

module.exports = router;
