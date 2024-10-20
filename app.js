const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const http = require('http'); // Add this line
const { initiateChatServer } = require('./Controllers/Chat');
const userLoginRoute = require("./Routes/Login");
const userLogoutRoute = require("./Routes/Logout");
const patientRegisterRoute = require("./Routes/Patient/Register");
const doctorRegisterRoute = require("./Routes/Doctor/Register");
const patienProfileRoute = require("./Routes/Patient/Profile");
const patientEditRoute = require("./Routes/Patient/Edit");
const patientAppointmentBookRoute = require("./Routes/Patient/Appointment/book");
const patientSubmitReviewRoute = require("./Routes/Patient/Appointment/SubmitReview");
const patientHomeRoute = require("./Routes/Patient/Home");
const backOfficeRoute = require("./Routes/backOffice/backOfficeRoutes");
// const patientAddPrescriptionRoute = require('./Routes/Patient/MedicalHistory/addPrescription');
// const patientDeletePrescriptionRoute= require('./Routes/Patient/MedicalHistory/deletePrescription');
// const patientViewPrescriptionRoute= require('./Routes/Patient/MedicalHistory/viewPrescription');
const patientUploadMedicalDocumentRoute = require("./Routes/Patient/Medical Document/Upload");
const patientViewMedicalDocumentRoute = require("./Routes/Patient/Medical Document/View");
const patientDeleteMedicalDocumentRoute = require("./Routes/Patient/Medical Document/Delete");
const doctorProfileRoute = require("./Routes/Doctor/Profile");
const doctorEditRoute = require("./Routes/Doctor/Edit");
// const doctorAddAvailabilityRoute = require('./Routes/Doctor/Availability/add');
// const doctorDeleteAvailabilityRoute = require('./Routes/Doctor/Availability/Delete');
const doctorProfilePictureUploadRoute = require("./Routes/Doctor/Profile Picture/Upload");
// const doctorPatientPrescriptionAddRoute = require('./Routes/Doctor/Patient Prescription/Add');
const doctorAppointmentResponseAddRoute = require("./Routes/Doctor/AppointmentResponse");
const doctorFollowUpAppointmentAddRoute = require("./Routes/Doctor/BookFollowUp");
const doctorAppointmentResultsAddRoute = require("./Routes/Doctor/AppointmentResults");
const doctorAppointmentHistoryRoute = require("./Routes/Doctor/AppointmentHistory");
const doctorAppointmentDetailsRoute = require("./Routes/Doctor/AppointmentDetails");
const doctorPatientsummaryRoute = require("./Routes/Doctor/Patientsummary");
const doctorAvailabilityRoute = require("./Routes/Doctor/Availability");
const chatRoute = require("./Routes/Chat");
const { globalErrorHanlder } = require("./Utilities");
const port = process.env.PORT || 4000;
const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API documentation for my Express server.",
    },
  },
  apis: ["./routes/**/*.js", "./controllers/**/*.js", "./swagger.json"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const allowedOrigins = [
  "*",
  "https://tele-med-pilot.vercel.app",
  "https://tele-med-pilot-fe.vercel.app",
];
// Allow all origins for development purposes, uncomment for production.
//app.use(cors({
// origin: function (origin, callback) {
//    if (!origin) return callback(null, true);
//    if (allowedOrigins.indexOf(origin) === -1) {
//      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//      return callback(new Error(msg), false);
//    }
//    return callback(null, true);
//  },
//  credentials: true,
//}));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/login", userLoginRoute);
app.use("/logout", userLogoutRoute);
app.use("/patient/register", patientRegisterRoute);
app.use("/doctor/register", doctorRegisterRoute);
app.use("/patient/profile", patienProfileRoute);
app.use("/patient/edit", patientEditRoute);
app.use("/patient/appointment", patientAppointmentBookRoute);
app.use("/patient/appointment", patientSubmitReviewRoute);
app.use("/patient/home", patientHomeRoute);
// app.use('/patient/prescription/add',patientAddPrescriptionRoute);
// app.use('/patient/prescription/view',patientViewPrescriptionRoute);
// app.use('/patient/prescription/delete',patientDeletePrescriptionRoute);
app.use("/patient/medical-document/upload", patientUploadMedicalDocumentRoute);
app.use("/patient/medical-document/view", patientViewMedicalDocumentRoute);
app.use("/patient/medical-document/delete", patientDeleteMedicalDocumentRoute);
app.use("/doctor/edit", doctorEditRoute);
app.use("/doctor/profile", doctorProfileRoute);
app.use("/doctor/availability", doctorAvailabilityRoute);
// app.use('/doctor/availability/delete', doctorDeleteAvailabilityRoute);
app.use("/doctor/profile-picture/upload", doctorProfilePictureUploadRoute);
// app.use('/doctor/patient-prescription/add', doctorPatientPrescriptionAddRoute);
app.use("/doctor/AppointmentResponse", doctorAppointmentResponseAddRoute);
app.use("/doctor/BookFollowUp", doctorFollowUpAppointmentAddRoute);
app.use("/doctor/AppointmentResults", doctorAppointmentResultsAddRoute);
app.use("/doctor/appointmentHistory", doctorAppointmentHistoryRoute);
app.use("/doctor/appointmentDetails", doctorAppointmentDetailsRoute);
app.use("/doctor/PatientSummary", doctorPatientsummaryRoute);
/// backOffice
app.use("/backOffice", backOfficeRoute);
app.use("/appointment-chat", chatRoute);

// app.use("/", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     ok: false,
//     message: "No such route founded in server...💣💣💣",
//   });
// });

app.use(globalErrorHanlder);

const server = http.createServer(app); 
initiateChatServer(server);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
