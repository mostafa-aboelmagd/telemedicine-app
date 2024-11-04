const bcrypt = require('bcryptjs');
const database = require('../Database/notifications');
const { createToken } = require('../Utilities');
const { ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS } = process.env;
const { Expo } = require('expo-server-sdk');
// Create a new Expo SDK client
const expo = new Expo();

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
const addNotification = async (req, res) => {
    try {
        const notification = req.body;
        // 1. Store the notification in the database
        await database.addNotification(notification);
        res.json({ message: 'Notifications added' });
        // 2. Fetch the recipient's Expo push token from the database
        const pushToken = await database.fetchExpotoken(notification.recipientId);
        // 3. Send the push notification
        if (Expo.isExpoPushToken(pushToken)) {
            await sendPushNotification(pushToken, "New Message", messageText);
        } else {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
        }
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};
async function sendPushNotification(pushToken, title, body) {
    try {
        const message = {
            to: pushToken,
            sound: 'default',
            title: title,
            body: body,
            data: "Hellow there this is a test notification",
        };

        const ticketChunk = await expo.sendPushNotificationsAsync([message]);
        console.log(ticketChunk);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUnreadNotifications, getNotifications, markNotificationsAsRead, addNotification};
