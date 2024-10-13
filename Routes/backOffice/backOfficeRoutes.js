const express = require("express");
const backOfficeController = require("../../Controllers/backOffice/backOfficeController");
const { tokenAuthentication } = require("../../Middleware/User/Authentication");
const { restrictTo } = require("../../Utilities");
const router = express.Router();

router.use("/", tokenAuthentication, restrictTo("Patient"));
router.get("/getAllPatients", backOfficeController.getAllPatients);
router.post("/getPatient", backOfficeController.getPatientInfo);
router.post("/changePatientState", backOfficeController.changePersonState);

module.exports = router;
