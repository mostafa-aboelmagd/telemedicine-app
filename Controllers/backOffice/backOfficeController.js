const { AppError } = require("../../Utilities");
const { catchAsyncError } = require("../../Utilities");
const { retrievePatientInfo } = require("../../Database/Patient/Profile");
const {
  retrieveAllPatients,
} = require("../../Database/backOffice/backOfficeModel");
const { updateInfo } = require("../Patient/Edit");

// exports.getAllAppointments = catchAsyncError(async (req, res, next) => {
//   const { id } = req;
//   if (!id) {
//     return next(new AppError("User id not found....💣💣💣", 400));
//   }
//   res.status(200).json({
//     status: "sucess",
//     ok: true,
//   });
// });
exports.getPatientInfo = catchAsyncError(async (req, res, next) => {
  const { id, eamil } = req;
  if (!id) return next(new AppError("User id not found...💣💣💣", 400));
  const patient = await retrievePatientInfo(id, eamil);
  if (patient) {
    return res.status(200).json({
      status: "sucess",
      ok: true,
    });
  }
  return next(new AppError("User id not found...💣💣💣", 400));
});

exports.changePersonState = catchAsyncError(async (req, res, next) => {
  const { id, eamil } = req;
  if (!id || !eamil)
    return next(new AppError("User id not found...💣💣💣", 400));
  const { state } = req.body;
  if (!state) return next(new AppError("Please provide the state....", 400));

  const patient = await updateInfo(id, eamil, { state });

  if (!patient) return next(new AppError("failed to updated data .....", 400));

  res.status(202).json({
    status: "success",
    ok: true,
    patient,
  });
});

exports.getAllPatients = catchAsyncError(async () => {
  const patients = await retrieveAllPatients();
  if (!patients) {
    return next(new AppError("no patients founded....", 201));
  }
  return res.state(200).json({
    status: "success",
    ok: true,
    patients,
  });
});
