const bcrypt = require('bcryptjs');
const database = require('../Database/notifications');
const { createToken } = require('../Utilities');
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;
const getUnreadNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const notifications = await database.getUnreadNotifications(userId);
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications'
 });
    }
};
const getNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const notifications = await database.getNotifications(userId);
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications'
 });
    }
};
const markNotificationsAsRead = async (req, res) => {
    try {
        const notificationIds = req.body.notificationIds; // Assuming an array of IDs is sent in the request body
        if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
            return res.status(400).json({ error: 'Invalid notification IDs' });
        }
        await database.markNotificationsAsRead(notificationIds);
        res.json({ message: 'Notifications marked as read' });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ error: 'Failed to mark notifications as read' });
    }
};
module.exports = { getUnreadNotifications, getNotifications, markNotificationsAsRead };
