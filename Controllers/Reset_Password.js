const database = require('../Database/Reset_Password');
const { createResetPasswordToken, passwordValidation } = require('../Utilities');

const sendResetEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await database.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = createResetPasswordToken(user[0].user_id, user[0].user_email, user[0].user_role);


        res.status(200).json({ message: 'User retrived successfully', token: token });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    const id = req.id;
    const email = req.email;

    if (!id || !email) {
        return res.status(401).json({ message: 'User not Authorized to reset password' });
    }

    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    if (!passwordValidation(password)) {
        return res.status(400).json({ message: 'Very weak password' });
    }

    try {
        
        const isPasswordUpdated = await database.updatePassword(id, email, password);
        if (!isPasswordUpdated) {
            return res.status(500).json({ message: 'Error updating password' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { sendResetEmail, resetPassword };