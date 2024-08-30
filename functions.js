const jwt = require('jsonwebtoken');
require('dotenv').config();

const passwordValidation = (str) => {
    const hasNumbers = /\d/.test(str);
    const hasAlphabets = /[a-zA-Z]/.test(str);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(str);

    return hasNumbers && hasAlphabets && hasSpecialChars && str.length >= 8;
}

const splitAndToLower = (str) => {
    const [str_1, str_2] = str.split(' ');
    if (str_1 && str_2) {
        return [str_1.toLowerCase(), str_2.toLowerCase()];
    }
    return [str_1 ? str_1.toLowerCase() : '', str_2 ? str_2.toLowerCase() : ''];
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_IN_DAYS
    });
}

module.exports = {passwordValidation, splitAndToLower, createToken};