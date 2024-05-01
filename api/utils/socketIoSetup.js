const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

// Socket.io connection handling
io.on('connection', socket => {
  console.log('A user connected');

  // Handle disconnection if needed
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = { server, io };
