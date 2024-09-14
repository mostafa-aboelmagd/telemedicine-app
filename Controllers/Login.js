const bcrypt = require('bcryptjs');
const database = require('../Database/Login');
const { createToken } = require('../Utilities');
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user and returns an authentication token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               email:
 *                 type: "string"
 *                 format: "email"
 *                 description: "User's email address"
 *               password:
 *                 type: "string"
 *                 description: "User's password"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 message:
 *                   type: "string"
 *                   example: "Login successful"
 *                 token:
 *                   type: "string"
 *       400:
 *         description: Invalid credentials or token generation error
 *         content:
 *           application/json:
 *             schema:
 *               type: "string"
 *               examples:
 *                 - 
 *                   summary: "Invalid email or password"
 *                   value: "Invalid email or password"
 *                 -
 *                   summary: "Token could not be created"
 *                   value: "Token could not be created"
 *       404:
 *         description: Missing fields in the request body
 *         content:
 *           application/json:
 *             schema:
*                   type: "string"
*                   example: "Please fill all the fields" 
 *     
 */ 

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let message = '';
    if (!email || !password) {
        message = 'Please fill all the fields';
        return res.status(404).json(message);
    }
    const user = await database.retrieveUser(email);
    if (!user) {
        message = 'Invalid email or password'
        return res.status(400).json(message);
    }
    console.log('User retrieved:', user);
    const match = await bcrypt.compare(password, user[0].user_password_hash);
    console.log('Password match result:', match); 
    if (!match) {
        message = 'Invalid email or password'
        return res.status(400).json(message);
    }
    const token = createToken(user[0].user_id, user[0].user_email, user[0].user_role);
    if (!token) {
        message = 'Token could not be created';
        return res.status(400).json(message);
    }
    res.cookie('jwt', token, { httpOnly: true, maxAge: ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS });
    return res.json({ message: 'Login successful', userInfo: {
        firstName: user[0].user_first_name,
        lastName: user[0].user_last_name,
        role: user[0].user_role,
    }});
}

module.exports = { login };