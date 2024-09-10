const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const userLoginRoute = require('./Routes/Login');
const patientRegisterRoute = require('./Routes/Patient/Register');
const patienProfileRoute = require('./Routes/Patient/Profile');
const patientEditRoute = require('./Routes/Patient/Edit');
const patientAppointmentBookRoute = require('./Routes/Patient/Appointment/Book');
const patientHomeRoute = require('./Routes/Patient/Home');
const patientAddPrescriptionRoute = require('./Routes/Patient/MedicalHistory/addPrescription');
const patientDeletePrescriptionRoute= require('./Routes/Patient/MedicalHistory/deletePrescription');
const patientViewPrescriptionRoute= require('./Routes/Patient/MedicalHistory/viewPrescription');
const doctorProfileRoute = require('./Routes/Doctor/Profile');
const doctorEditRoute = require('./Routes/Doctor/Edit');
const doctorAddAvailabilityRoute = require('./Routes/Doctor/Availability/add');
const doctorDeleteAvailabilityRoute = require('./Routes/Doctor/Availability/Delete');
const doctorEditAvailabilityRoute = require('./Routes/Doctor/Availability/edit');
const port = process.env.PORT || 4000;
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json()); 
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/login', userLoginRoute);
app.use('/patient/register', patientRegisterRoute);
app.use('/patient/profile', patienProfileRoute);
app.use('/patient/edit', patientEditRoute);
app.use('/patient/appointment/book', patientAppointmentBookRoute);
app.use('/patient/home', patientHomeRoute);
app.use('/patient/prescription/add',patientAddPrescriptionRoute);
app.use('/patient/prescription/view',patientViewPrescriptionRoute);
app.use('/patient/prescription/delete',patientDeletePrescriptionRoute);
app.use('/doctor/edit', doctorEditRoute);
app.use('/doctor/profile', doctorProfileRoute);
app.use('/doctor/availability/add', doctorAddAvailabilityRoute);
app.use('/doctor/availability/delete', doctorDeleteAvailabilityRoute);
app.use('/doctor/availability/edit', doctorEditAvailabilityRoute);



app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, (error) => {
  if (error) {
      console.error(error);
      return;
  }
  console.log(`Server is running on port ${port}`);
});