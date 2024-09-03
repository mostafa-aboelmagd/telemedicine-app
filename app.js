const express = require('express');
const cookieParser = require('cookie-parser');
const patientLoginRoute = require('./Routes/Patient/Login');
const patientRegisterRoute = require('./Routes/Patient/Register');
const patienProfileRoute = require('./Routes/Patient/Profile');
const patientEditRoute = require('./Routes/Patient/Edit');
const doctorLoginRoute = require('./Routes/Doctor/Login');
const doctorProfileRoute = require('./Routes/Doctor/Profile');
const doctorEditRoute = require('./Routes/Doctor/Edit');
// const doctorAddAvailabilityRoute = require('./Routes/Doctor/addAvailability');
const appointmentCreateRoute = require('./Routes/Appointment/Create');
const port = 3000;
const app = express();

app.use(express.json()); 
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });


app.use('/patient/login', patientLoginRoute);
app.use('/patient/register', patientRegisterRoute);
app.use('/patient/profile', patienProfileRoute);
app.use('/patient/edit', patientEditRoute);
app.use('/doctor/login', doctorLoginRoute);
app.use('/doctor/edit', doctorEditRoute);
app.use('/doctor/profile', doctorProfileRoute);
// app.use('/doctor/add/availability', doctorAddAvailabilityRoute);
app.use('/appointment/create', appointmentCreateRoute);

// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
// });

app.listen(port, (error) => {
  if (error) {
      console.error(error);
      return;
  }
  console.log(`Server is running on port ${port}`);
});