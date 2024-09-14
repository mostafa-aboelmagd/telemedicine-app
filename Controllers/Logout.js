const logout = async (req, res) => {
    try {
        res.setHeader('Authorization', ''); 
        return res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};

module.exports = { logout };
