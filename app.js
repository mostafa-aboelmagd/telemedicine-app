const express = require('express');
const cookieParser = require('cookie-parser');
const patientRegisterRoutes = require('./routes/patientRegister');
const doctorLoginRoutes = require('./routes/doctorLogin');
const doctorEditRoutes = require('./routes/doctorEdit');
const port = 3000;


const authRoutes = require('./routes/auth');

const app = express();


app.use(express.json()); 
app.use(cookieParser());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use('/auth', authRoutes);
app.use('/patient/register', patientRegisterRoutes);
app.use('/doctor/login', doctorLoginRoutes);
app.use('/doctor/edit', doctorEditRoutes);

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