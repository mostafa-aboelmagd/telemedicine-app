const bcrypt = require('bcryptjs');
const database = require('../../Database/Patient/Login');
const { createToken } = require('../../Utilities');
require('dotenv').config();
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;

const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send('Please fill all the fields');
  }
  const patient = await database.retrievePatient(email);
  if (!patient) {
    return res.status(401).send('Invalid email or password');
  }
  const storedPasswordHash = patient[0].password_hash; 
  const isEqual = await bcrypt.compare(password, storedPasswordHash);

  if (!isEqual) {
    return res.status(402).send('Invalid email or password');
  }
  const token = createToken(patient[0].user_id, patient[0].email);
  res.cookie('jwt', token, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
  res.redirect('/patient/profile');
}

module.exports = { login };