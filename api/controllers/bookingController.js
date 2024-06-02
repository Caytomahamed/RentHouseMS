const handleFactory = require('./handleFactory');
const bookingModel = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const app = require('../app');
const appError = require('../utils/appError');
const {
  sendExpoPushNotification,
} = require('../utils/sendExpoPushNotification');
const { getCurrentDate } = require('../utils/timeHelpers');

exports.bookingNow = catchAsync(async (req, res, next) => {
  const tenantId = req.user.id;

  const { pushToken } = req.query;

  console.log('pushToke', pushToken);

  // const [user] = await bookingModel.findByUserId(userId);

  // if (user) {
  //   return next(new appError('OOW! you are already booking one'));
  // }

  const [booking] = await bookingModel.create({
    tenantId,
    startDate: getCurrentDate(),
    propertyId: req.body.propertyId,
    endDate: req.body.endDate,
    securityDeposit: req.body.securityDeposit,
    amount: req.body.amount,
    status: 'completed',
    paymentMethod: req.body.paymentMethod,
    transactionId: req.body.transactionId,
    paidAt: new Date(),
  });

  if (!booking) {
    return next(new appError('OH! booking not found.Please try again'));
  }

  const title = 'New Booking';
  const body = 'You have a new booking and ready to ride!😇';

  // sendExpoPushNotification(pushToken, title, body);

  res.status(200).json({
    status: 'success',
    data: booking,
  });
});

exports.getBookingByUserId = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const book = await bookingModel.findBookingsByUserId(userId);
  console.log(book);

  console.log(userId);

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
  const { pushToken } = req.query;

  console.log('unbooking');

  const book = await bookingModel.unBooking(bookingId);

  if (book.length === 0) {
    return next(new appError('OH! someThing is wrong.Please tyr again'));
  }

  const title = 'UnBooking';
  const body = 'You have successfully marked this booking as off today. ';

  sendExpoPushNotification(pushToken, title, body);
  res.status(200).json({
    status: 'success',
    data: 'successfull deleted',
  });
});

exports.getAllBooking = handleFactory.getAll(bookingModel);
exports.getBooking = handleFactory.getOne(bookingModel);
exports.createBooking = handleFactory.createOne(bookingModel);
exports.updateBooking = handleFactory.updateOne(bookingModel);
exports.deleteBooking = handleFactory.deleteOne(bookingModel);
