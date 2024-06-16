const paymentModel = require('../models/paymentModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const handleFactory = require('./handleFactory');

exports.getPaymentByLandlordId = catchAsync(async (req, res, next) => {
  const { landlordId } = req.params;
  const payment = await paymentModel.findByLandlordId(landlordId);

  if (!payment) {
    return next(new appError('Payment not found', 404));
  }

  res.status(200).json({
    status: 'success',
    result: payment.length,
    data: payment,
  });
});

exports.getAllPayments = handleFactory.getAll(paymentModel);
exports.getOnePayment = handleFactory.getOne(paymentModel);
exports.updatePayment = handleFactory.updateOne(paymentModel);
exports.deletePayment = handleFactory.deleteOne(paymentModel);
