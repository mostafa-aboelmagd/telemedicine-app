const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const patientLoginRoute = require('./Routes/Patient/Login');
const patientRegisterRoute = require('./Routes/Patient/Register');
const patienProfileRoute = require('./Routes/Patient/Profile');
const patientEditRoute = require('./Routes/Patient/Edit');
const patientAppointmentBookRoute = require('./Routes/Patient/Appointment/book');
const patientHomeRoute = require('./Routes/Patient/Home');
const doctorLoginRoute = require('./Routes/Doctor/Login');
const doctorProfileRoute = require('./Routes/Doctor/Profile');
const doctorEditRoute = require('./Routes/Doctor/Edit');
const doctorAddAvailabilityRoute = require('./Routes/Doctor/Availability/add');
const doctorDeleteAvailabilityRoute = require('./Routes/Doctor/Availability/delete');
const doctorEditAvailabilityRoute = require('./Routes/Doctor/Availability/edit');
const doctorCreateAppointmentRoute = require('./Routes/Doctor/Appointment/create');
const doctorDeleteAppointmentRoute = require('./Routes/Doctor/Appointment/delete');
const doctorEditAppointmentRoute = require('./Routes/Doctor/Appointment/edit');
require('dotenv').config();
const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/patient/login', patientLoginRoute);
app.use('/patient/register', patientRegisterRoute);
app.use('/patient/profile', patienProfileRoute);
app.use('/patient/edit', patientEditRoute);
app.use('/patient/appointment/book', patientAppointmentBookRoute);
app.use('/patient/home', patientHomeRoute);
app.use('/doctor/login', doctorLoginRoute);
app.use('/doctor/edit', doctorEditRoute);
app.use('/doctor/profile', doctorProfileRoute);
app.use('/doctor/availability/add', doctorAddAvailabilityRoute);
app.use('/doctor/availability/delete', doctorDeleteAvailabilityRoute);
app.use('/doctor/availability/edit', doctorEditAvailabilityRoute);
app.use('/doctor/appointment/create', doctorCreateAppointmentRoute);
app.use('/doctor/appointment/delete', doctorDeleteAppointmentRoute);
app.use('/doctor/appointment/edit', doctorEditAppointmentRoute);
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