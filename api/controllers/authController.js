const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');

const usersModel = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sentEmail = require('../utils/email');

// Middelware check confirm password
exports.checkPasswordConfirm = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  const checker =
    password.length === passwordConfirm.length && password === passwordConfirm;

  if (!checker) {
    return next(
      new AppError('password and  passwordconfirm is not same!', 404),
    );
  }

  checker && delete req.body.passwordConfirm;
  next();
});

exports.checkIsEmailValid = catchAsync(async (req, res, next) => {
  if (!isEmail(`${req.body.email}`)) {
    return next(new AppError('Your email is not valid.Please try again', 400));
  }
  next();
});

exports.checkIsIfEmailExist = catchAsync(async (req, res, next) => {
  req.body.email;
  const ifEmailExisting = await usersModel.findOne({
    condition: 'u.email',
    field: req.body.email,
  });
  ifEmailExisting;
  if (!ifEmailExisting) {
    return next(
      new AppError("Your email isn't exists. Pleasu Try again!", 400),
    );
  }
  next();
});

// Middleware Admin role not allowed
exports.checkRoleIfIsAdmin = catchAsync(async (req, res, next) => {
  const checker = `${req.body.roleName}`.toLowerCase().trim() === 'admin';

  if (checker) {
    return next(
      new AppError('Not allowed to be admin. Bluid your own one', 401),
    );
  }
  next();
});

const singToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIREIN,
  });
};

const createTokenandSent = (user, statusCode, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIREIN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  const token = singToken(user.id);
  res.cookie('jwt', token, cookieOptions);

  delete user.password; // don't show a password

  res.status(statusCode).json({
    status: 'success',
    token,
    userType: user.userType,
    data: {
      ...user,
      token,
    },
  });
};

/////////////////////////////////////////////////
// Authentication
exports.signup = catchAsync(async (req, res, next) => {
  const ifEmailExisting = await usersModel.findOne({
    condition: 'u.email',
    field: req.body.email,
  });

  if (ifEmailExisting) {
    return next(
      new AppError('Email Already exists.Please use another one', 400),
    );
  }

  // 1) Create user
  const [newStudent] = await usersModel.create(req.body);

  // 2) login token
  createTokenandSent(newStudent, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) if email and paaword exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 401));
  }

  // 2) check if user exist and password correct
  const user = await usersModel.findOne({
    condition: 'u.email',
    field: req.body.email,
  });

  if (!user || !(await usersModel.correctPassword(password, user.password))) {
    return next(
      new AppError('Incorrect email or password.Please Try again!', 401),
    );
  }

  // 3). everthing is ok, send token to client
  createTokenandSent(user, 200, res);
});

// Logout
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.proctect = catchAsync(async (req, res, next) => {
  // 1) check if token access
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  // 2). verification token or expired
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3). check if still user exist
  const [freshUser] = await usersModel.findById(decode.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging this token does no longer exist!', 401),
    );
  }
  // 4). check if user change after the token was issued
  if (usersModel.changePasswordAfter(freshUser.updateAt, decode.iat)) {
    return next(
      new AppError(
        'User recently changed password!. Please log in again!',
        401,
      ),
    );
  }

  // GRANT access TO PROCTECT ROUTE
  req.user = freshUser;
  next();
});

