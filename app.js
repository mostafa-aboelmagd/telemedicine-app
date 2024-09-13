const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userLoginRoute = require('./Routes/Login');
const patientRegisterRoute = require('./Routes/Patient/Register');
const patienProfileRoute = require('./Routes/Patient/Profile');
const patientEditRoute = require('./Routes/Patient/Edit');
const patientAppointmentBookRoute = require('./Routes/Patient/Appointment/book');
const patientHomeRoute = require('./Routes/Patient/Home');
const patientAddPrescriptionRoute = require('./Routes/Patient/MedicalHistory/addPrescription');
const patientDeletePrescriptionRoute= require('./Routes/Patient/MedicalHistory/deletePrescription');
const patientViewPrescriptionRoute= require('./Routes/Patient/MedicalHistory/viewPrescription');
const patientUploadMedicalDocumentRoute = require('./Routes/Patient/Medical Document/Upload');
const patientViewMedicalDocumentRoute = require('./Routes/Patient/Medical Document/View');
const patientDeleteMedicalDocumentRoute = require('./Routes/Patient/Medical Document/Delete');
const doctorProfileRoute = require('./Routes/Doctor/Profile');
const doctorEditRoute = require('./Routes/Doctor/Edit');
const doctorAddAvailabilityRoute = require('./Routes/Doctor/Availability/add');
const doctorDeleteAvailabilityRoute = require('./Routes/Doctor/Availability/Delete');
const port = process.env.PORT || 4000;
const app = express();


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
      description: 'API documentation for my Express server.'
    }
  },
  apis: ['./routes/**/*.js', './controllers/**/*.js', './swagger.json'], 
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'multipart/form-data'],
  credentials: true
}));
app.use(express.json()); 

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
app.use('/patient/medical-document/upload', patientUploadMedicalDocumentRoute);
app.use('/patient/medical-document/view', patientViewMedicalDocumentRoute);
app.use('/patient/medical-document/delete', patientDeleteMedicalDocumentRoute);
app.use('/doctor/edit', doctorEditRoute);
app.use('/doctor/profile', doctorProfileRoute);
app.use('/doctor/availability/add', doctorAddAvailabilityRoute);
app.use('/doctor/availability/delete', doctorDeleteAvailabilityRoute);



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