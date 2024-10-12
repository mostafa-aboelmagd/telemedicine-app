const { AppError } = require("../../Utilities");
const { catchAsyncError } = require("../../Utilities");
const { retrievePatientInfo } = require("../../Database/Patient/Profile");
const {
  retrieveAllPatients,
} = require("../../Database/backOffice/backOfficeModel");
const {
  changePatientState,
} = require("../../Database/backOffice/backOfficeModel");
const { emit } = require("nodemon");

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
  const { id, email } = req.body;
  if (!id || !email)
    return next(new AppError("Please provide id and email ...💣💣💣", 400));
  const patient = await retrievePatientInfo(id, email);
  if (patient) {
    return res.status(200).json({
      status: "sucess",
      ok: true,
      patient,
    });
  }
  return next(new AppError("Invalid id or email...💣💣💣", 400));
});

exports.changePersonState = catchAsyncError(async (req, res, next) => {
  const { id, email } = req;
  if (!id || !email) return next(new AppError("User id not found...💣💣", 400));
  const { state } = req.body;
  if (!state)
    return next(new AppError("Please provide the new state....", 400));

  const patient = await changePatientState(id, email, state);

  console.log(patient);

  if (!patient) return next(new AppError("failed to updated data .....", 400));

  res.status(202).json({
    status: "success",
    ok: true,
    message: "state changed successfully",
  });
});

exports.getAllPatients = catchAsyncError(async (req, res, next) => {
  // order validation to avoid injection
  const validCol = ["user_first_name", "created_at", "updated_at"];

  let { order, limit } = req.query;
  const orderArr = order.split(",");
  const orderDir = orderArr
    .map((el, i) => {
      if (el.startsWith("-")) {
        orderArr[i] = el.slice(1);
        return "DESC";
      }
      return "ASC";
    })
    .join("|");
  const isValidCol = orderArr.every((el) => validCol.includes(el));
  if (!isValidCol) {
    return next(new AppError("Invalid order fields....", 400));
  }
  let queryOptions = `ORDER BY ${orderArr.join(" ")} ${orderDir}`;
  //
  if (!limit || !Number.isInteger(+limit)) {
    limit = 100;
  }
  queryOptions += ` LIMIT ${limit}`;

  const patients = await retrieveAllPatients(queryOptions);
  if (!patients) {
    return next(new AppError("no patients founded....", 400));
  }
  return res.status(200).json({
    status: "success",
    ok: true,
    patients,
  });
});
