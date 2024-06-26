const handleFactory = require('./handleFactory');
const bookingModel = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const {
  sendExpoPushNotification,
} = require('../utils/sendExpoPushNotification');
const { getCurrentDate } = require('../utils/timeHelpers');

const cron = require('node-cron');

exports.bookingNow = catchAsync(async (req, res, next) => {
  const tenantId = +req.user.id;

  const book = await bookingModel.findByUserId(tenantId);

  if (book) {
    return next(new appError('OOW! you are already booking one'));
  }

  const [booking] = await bookingModel.create({
    tenantId,
    startDate: getCurrentDate(),
    propertyId: req.body.propertyId,
    endDate: req.body.endDate,
  });

  if (!booking) {
    return next(new appError('OH! booking not found.Please try again'));
  }

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});

exports.paidNow = catchAsync(async (req, res, next) => {
  const [booking] = await bookingModel.payRent({
    bookingId: req.body.bookingId,
    propertyId: req.body.propertyId,
    endDate: req.body.endDate,
    amount: req.body.amount,
    status: 'completed',
    paymentMethod: req.body.paymentMethod,
    transactionId: req.body.transactionId,
    securityDeposit: req.body.securityDeposit,
    paidAt: new Date(),
  });

  if (!booking) {
    return next(new appError('OH! booking not found.Please try again'));
  }

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});

exports.getBookingByUserId = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  console.log('id', userId);
  const book = await bookingModel.findBookingsByUserId(userId);
  console.log(book);

  if (book.length === 0) {
    return next(new appError('OH! you are not booking a house'));
  }

  res.status(200).json({
    status: 'success',
    data: book,
  });
});

exports.unBooking = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  const book = await bookingModel.unBooking(bookingId);

  if (book.length === 0) {
    return next(new appError('OH! someThing is wrong.Please tyr again'));
  }

  res.status(200).json({
    status: 'success',
    data: 'successfull deleted',
  });
});

exports.cancellation = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  console.log(bookingId);

  const book = await bookingModel.requestCancellation(bookingId);

  if (book.length === 0) {
    return next(new appError('OH! someThing is wrong.Please tyr again'));
  }

  res.status(200).json({
    status: 'success',
    data: 'successfull deleted',
  });
});

// get by landlord id
exports.getBookingByLandlordId = catchAsync(async (req, res, next) => {
  const { landlordId } = req.params;
  const book = await bookingModel.findBookingsByLandlordId(landlordId);

  // if (book.length === 0) {
  //   return next(new appError('OH! no one not booking your  houses'));
  // }

  res.status(200).json({
    status: 'success',
    data: book,
  });
});

exports.confirm = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  const [booking] = await bookingModel.confirmBooking(bookingId);

  if (!booking) {
    return next(new appError('Booking not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});

exports.reject = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;

  const [booking] = await bookingModel.rejectBooking(bookingId);

  if (!booking) {
    return next(new appError('Booking not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled task to delete old cancellations...');
  try {
    await bookingModel.deleteOldCancellations();
    console.log('Old cancellations deleted successfully.');
  } catch (error) {
    console.error('Error deleting old cancellations:', error);
  }
});

// Scheudle the task to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled task to update cancellation process...');
  try {
    await bookingModel.updateCancellationProcess();
    console.log('Cancellation process updated successfully.');
  } catch (error) {
    console.error('Error updating cancellation process:', error);
  }
});

// find by userId
exports.getBookingByTenantId = catchAsync(async (req, res, next) => {
  const { tenantId } = req.params;

  const booking = await bookingModel.findByUserId(tenantId);

  console.log('book', booking);

  if (!booking) {
    return next(new appError('No booking found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});

exports.getAllBooking = handleFactory.getAll(bookingModel);
exports.getBooking = handleFactory.getOne(bookingModel);
exports.createBooking = handleFactory.createOne(bookingModel);
exports.updateBooking = handleFactory.updateOne(bookingModel);
exports.deleteBooking = handleFactory.deleteOne(bookingModel);
