const Controller = require('./Controller');
const userModal = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class UserController extends Controller {
  constructor() {
    super(userModal);
  }

  updateMe = catchAsync(async (req, res, next) => {
    const id = req.user.id;
    const user = await this.Model.updateMe(id, req.body);

    if (!user) {
      return next(new AppError('Update user failed. Please try again!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  });

  getUserInfo = catchAsync(async (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new AppError('You are not logged in. Please login!', 401));
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  });

  getTenants = catchAsync(async (req, res, next) => {
    const tenants = await this.Model.findTenants();

    if (!tenants) {
      return next(new AppError('No tenants found!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: tenants,
    });
  });

  getLandLord = catchAsync(async (req, res, next) => {
    const landlord = await this.Model.findLandLord();

    if (!landlord) {
      return next(new AppError('No landlord found!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: landlord,
    });
  });

  updateUser = catchAsync(async (req, res, next) => {
    const data = JSON.parse(req.body.body);
    const user = await this.Model.findByIdAndUpdate(req.params.id, {
      ...data,
      imageUrl: `${req.filename}`,
    });

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user,
    });
  });
}

module.exports = new UserController();
