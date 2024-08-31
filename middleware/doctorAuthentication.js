const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(decodedToken);
        req.id = decodedToken.id;
        next();
      }
    });
  } else {
    console.log('No token found');
  }
};

module.exports = { tokenAuthentication };