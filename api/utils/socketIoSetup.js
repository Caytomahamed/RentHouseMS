const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server);

// Socket.io connection handling
io.on('connection', socket => {
  ('A user connected');

  // Handle disconnection if needed
  socket.on('disconnect', () => {
    ('User disconnected');
  });
});

module.exports = { server, io };
