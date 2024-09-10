const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ACCESS_TOKEN_SECRET_KEY } = process.env;

const tokenAuthentication = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).send('Invalid token');
      } 
      console.log(decodedToken);
      req.id = decodedToken.id;
      req.email = decodedToken.email;
      next();
    });
  } else {
    return res.status(400).send('No token found');
  }
};

module.exports = { tokenAuthentication };