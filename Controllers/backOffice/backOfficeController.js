const { AppError } = require("../../Utilities");
const { catchAsyncError } = require("../../Utilities");
const { retrievePatientInfo } = require("../../Database/Patient/Profile");
const {
  retrieveAllPatients,
  retrieveAllDoctors,
  retrievePatientAppointments,
} = require("../../Database/backOffice/backOfficeModel");
const {
  changePatientState,
  changePersonState,
} = require("../../Database/backOffice/backOfficeModel");
const { queryHandler } = require("../../Utilities");
const { emit } = require("nodemon");
const { query } = require("express");

exports.getPatientInfo = catchAsyncError(async (req, res, next) => {
  const queryOptions = queryHandler(req.query);
  const { fields } = req.query;
  const { field } = req.params;
  let id, email;
  if (!field) return next(new AppError("Please provide id  ...💣💣💣", 400));
  if (Number.isInteger(+field)) id = field;
  else email = field;

  const patientInfo = await retrieveAllPatients(
    queryOptions,
    fields,
    id,
    email
  );
  // const patientApp = await retrievePatientAppointments(id);
  if (patientInfo) {
    return res.status(200).json({
      status: "sucess",
      ok: true,
      patientInfo,
      // patientAppointments: patientApp,
    });
  }
  return next(new AppError("Invalid id or email...💣💣💣", 400));
});

exports.changePatientState = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("User id not found...💣💣", 400));
  const { state } = req.body;
  if (!state)
    return next(new AppError("Please provide the new state....", 400));

  const patient = await changePersonState("patient", id, state);

  console.log(patient);

  if (!patient) return next(new AppError("failed to updated data .....", 400));

  res.status(200).json({
    status: "success",
    ok: true,
    message: "state changed successfully",
  });
});

exports.getAllPatients = catchAsyncError(async (req, res, next) => {
  const queryOptions = queryHandler(req.query);
  const { fields } = req.query;
  //

  const patients = await retrieveAllPatients(queryOptions, fields);
  if (!patients) {
    return next(new AppError("no patients founded....", 400));
  }
  return res.status(200).json({
    status: "success",
    ok: true,
    patients,
  });
});

exports.getPatientAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const queryOptions = queryHandler(req.query);
  const { fields } = req.query;

  if (!id) return next(new AppError("Please Provide Patient id ....⛔", 400));
  const patientAppointments = await retrievePatientAppointments(
    id,
    queryOptions,
    fields
  );
  if (patientAppointments) {
    res.status(200).json({
      status: "success",
      ok: true,
      patientAppointments,
    });
  }
});

exports.getAllDoctors = catchAsyncError(async (req, res, next) => {
  const queryOptions = queryHandler(req.query);
  const { fields, state } = req.query;

  let doctors = await retrieveAllDoctors(queryOptions, fields, state);
  if (!doctors) doctors = [];
  res.status(200).json({
    status: "success",
    ok: true,
    doctors,
  });
});

exports.changeDoctorState = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Please Provide Dcotor id ....⛔", 400));

  const { state } = req.body;
  if (!state)
    return next(new AppError("Please Provide Dcotor New State ....⛔", 400));

  const result = await changePersonState("doctor", id, state);
  if (result) {
    return res.status(200).json({
      status: "succes",
      ok: true,
      message: "Doctor State Updated Successfully..",
    });
  }
  return next(
    new AppError(
      "Failed to update Doctor State , Please try agian later..⛔💣",
      400
    )
  );
});

exports.getDoctorInfo = catchAsyncError(async (req, res, next) => {
  const queryOptions = queryHandler(req.query);
  const { fields } = req.query;
  const { field } = req.params;
  let id, email;
  if (!field) {
    return next(new AppError("Please Provide Doctor id ....⛔", 400));
  }
  if (Number.isInteger(+field)) {
    id = field;
  } else email = field;
  const doctor = await retrieveAllDoctors(
    undefined,
    fields,
    undefined,
    id,
    email
  );
  res.status(200).json({
    status: "sucess",
    ok: true,
    doctor,
  });
});
