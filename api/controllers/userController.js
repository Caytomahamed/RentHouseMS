const userModal = require('../models/userModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.summaryDash = catchAsync(async (req, res, next) => {
  // const drivers = await userModel.findAllBy(2);
  // const student = await userModel.findAllBy(3);
  // const schedules = await schedulesModel.find();
  // const bookings = await bookingsModel.find();

  res.status(200).json({
    status: 'success',
    data: {
      // student: student.length,
      // bookings: bookings.length,
      // schedules: schedules.length,
      // drivers: drivers.length,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const user = await userModal.updateMe(id, req.body);

  if (!user) {
    return next(new AppError('update user failed please try again!', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});

exports.getUserInfo = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});

exports.getUserNotification = catchAsync(async (req, res, next) => {
  const user = req.user;

  const notify = await userModal.findByUserNotify(user.id);

  if (!user) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  res.status(200).json({
    status: 'sucess',
    data: notify,
  });
});

exports.getTenants = catchAsync(async (req, res, next) => {
  const tenants = await userModal.findTenants();

  if (!tenants) {
    return next(new AppError('No tenants found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: tenants,
  });
});

exports.getLandLord = catchAsync(async (req, res, next) => {
  const landlord = await userModal.findLandLord();

  if (!landlord) {
    return next(new AppError('No landlord found!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: landlord,
  });
});
exports.updateUser = catchAsync(async (req, res, next) => {
  const data = JSON.parse(req.body.body);

  console.log('file name', req.filename);

  const user = await userModal.findByIdandUpdate(req.params.id, {
    ...data,
    imageUrl: `${req.filename}`,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: 'dd',
  });
});

exports.getAllUser = handleFactory.getAll(userModal);
exports.getUser = handleFactory.getOne(userModal);
exports.createUser = handleFactory.createOne(userModal);
exports.deleteUser = handleFactory.deleteOne(userModal);
