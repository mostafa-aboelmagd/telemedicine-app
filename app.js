const path = require('path');
const express = require('express');
const registerRoutes = require('./routes/register');
const doctorLoginRoutes = require('./routes/doctorLogin');
const bodyParser = require('body-parser');
const multer = require('multer');
const port = 3000;
const cors = require('cors'); // If you need CORS


const authRoutes = require('./routes/auth');

const app = express();


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/register', registerRoutes);
app.use('/login/doctor', doctorLoginRoutes);

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