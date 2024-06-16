const express = require('express');
const appError = require('./utils/appError');
const globalErorrHandle = require('./controllers/errorController');
const cors = require('cors');

// socket
const { io } = require('./utils/socketIoSetup');

// <routers></routers>
const userRouter = require('./routes/userRoutes');
const propertiesRouter = require('./routes/propertiesRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const driverRouter = require('./routes/driverRoutes');
const carRouter = require('./routes/carRoutes');
const routeRouter = require('./routes/routeRoutes');
const reportRouter = require('./routes/reportRoutes');
const maintanceRouter = require('./routes/maintenanceRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const inboxRouter = require('./routes/inboxRoutes');
const paymentRouter = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertiesRouter);
app.use('/api/v1/booking', bookingRouter);
// app.use('/api/v1/students', studentRouter);
app.use('/api/v1/drivers', driverRouter);
app.use('/api/v1/cars', carRouter);
app.use('/api/v1/routes', routeRouter);
app.use('/api/v1/reports', reportRouter);
app.use('/api/v1/maintenance', maintanceRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/inbox', inboxRouter);
app.use('/api/v1/payments', paymentRouter);

// route is wrong
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global errors handler
app.use(globalErorrHandle);

// Socket.io connection handling
io.on('connection', socket => {
  console.log('A user connected');

  // Handle disconnection if needed
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
module.exports = app;
