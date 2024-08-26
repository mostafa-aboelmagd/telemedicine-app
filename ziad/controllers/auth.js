const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../classes');
const { pool,insertUser } = require('../database');
const { passwordValidation } = require('../functions');
const saltRounds = 15;


exports.register = async(req, res, next) => {

  const { fName, lName, email, password, gender, phone, role, birthYear } = req.body;
    if (fName && lName && email && password && gender && phone && role && birthYear) {
        const passwordFlag = passwordValidation(password);
        if (passwordFlag) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = new User(fName, lName, email, hashedPassword, gender, phone, role, birthYear);
            const userFlag = await insertUser(user);
            if (userFlag) {
                return res.send('User registered successfully');
            } 
            return res.send('User already exists');
        }
        return res.send('Password must contain at least 8 characters, one number, one alphabet, and one special character');
    }
    return res.send('Please fill all the fields');
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }

    const storedPasswordHash = result.rows[0].password_hash; 

    const isEqual = await bcrypt.compare(password, storedPasswordHash);

    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: result.rows[0].email,
        userId: result.rows[0].user_id, 
      },
      'secretkey', 
      { expiresIn: '1h' } 
    );

    res.status(200).json({ 
      token: token, 
      userId: result.rows[0].user_id, 
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; 
    }
    next(err); 
  }
}