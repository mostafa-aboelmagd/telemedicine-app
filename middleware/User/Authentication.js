const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const tokenAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  let message = '';
  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        message = 'Invalid token';
        return res.status(401).json(message);
      } 
      console.log(decodedToken);
      req.id = decodedToken.id;
      req.email = decodedToken.email;
      req.userRole = decodedToken.role;
      next();
    });
  } else {
    message = 'No token found';
    return res.status(400).json(message);
  }
};

module.exports = { tokenAuthentication };