const bcrypt = require('bcryptjs');
const database = require('../../Database/Patient/Login');
const { createToken } = require('../../Utilities');
require('dotenv').config();
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let message = '';
  if (!email || !password) {
    message = 'Please fill all the fields';
    return res.status(404).json(message);
  }
  const patient = await database.retrievePatient(email);
  if (!patient) {
    message = 'Invalid email or password'
    return res.status(400).json(message);
  }
  const storedPasswordHash = patient[0].user_password_hash; 
  const isEqual = await bcrypt.compare(password, storedPasswordHash);

  if (!isEqual) {
    message = 'Invalid email or password'
    return res.status(400).json(message);
  }
  const token = createToken(patient[0].user_id, patient[0].user_email);
  res.cookie('jwt', token, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
  return res.json({ message: 'Login successful' , token: token });
}

module.exports = { login };