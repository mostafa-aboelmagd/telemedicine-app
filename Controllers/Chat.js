const database = require('../Database/Login');
const { Server } = require('socket.io');

const initiateChatServer = (server,io) => {

    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);
  
      socket.on('joinAppointmentChat', (appointmentId) => {
        socket.join(appointmentId);
        console.log(`User joined room ${appointmentId}`);
      });
  
      socket.on('sendMessage', async ({ senderId, receiverId, message, appointmentId }) => {
        try {
          const result = await database.insertMessage(senderId, receiverId, message, appointmentId);
          io.to(appointmentId).emit('newMessage', result.rows[0]);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      });
  
      socket.on('checkRoom', (appointmentId, callback) => {
        const room = io.sockets.adapter.rooms.get(appointmentId);
        if (room) {
          callback(true);
        } else {
          callback(false);
        }
      });
  
      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });
  };
  
  const getAppointmentChat = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    if (!appointmentId) {
      return res.status(400).json({ message: 'Appointment ID is required' });
    }
  
    try {
      const result = await database.getChatMessages(appointmentId);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving chat messages:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = { initiateChatServer, getAppointmentChat };