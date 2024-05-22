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
  console.log(req.body.email);
  const ifEmailExisting = await usersModel.findOne({
    condition: 'u.email',
    field: req.body.email,
  });
  console.log(ifEmailExisting);
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

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ["admin", "instructor"]. role = user
    if (!roles.includes(req.user.roleName)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403),
      );
    }

    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POST email
  const user = await usersModel.findOne({
    condition: 'u.email',
    field: req.body.email,
    auth: true,
  });

  if (!user) {
    return new AppError('There is no user with email address!', 404);
  }

  // 2) Generate random token
  const resetToken = await usersModel.createPasswordResetToken(user);

  // 3) sent it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forget your password? submit a PATH ref with your new password and passwordConfirm to: ${resetURL}\nif you didn't forget your password. Please forget this email`;

  try {
    await sentEmail({
      email: user.email,
      subject: 'Your password restToken (valid in 10min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (error) {
    const changes = {
      passwordResetToken: null,
      passwordResetExpires: null,
    };

    await usersModel.findByIdandUpdate(user.id, changes);
    return new AppError(
      'There was an erro senting mail. Please try latter! ',
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user base on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await usersModel.findOne({
    condition: 'u.passwordResetToken',
    field: hashedToken,
    auth: true,
  });

  // 2) if token has no expired and their is user set the new password
  if (!user || user.passwordResetExpires < Date.now()) {
    return next(new AppError('Token is invalid or has a expire!', 400));
  }

  // password hashed
  const hash = await bcrypt.hashSync(user.password, 12);

  // 3) update change passwotd at property of into user
  const changes = {
    password: hash,
    passwordResetToken: null,
    passwordResetExpires: null,
    updatedAt: Date.now() - 1000,
  };
  await usersModel.findByIdandUpdate(user.id, changes);

  // 4) log the user in sent token
  createTokenandSent(user, 201, res);
});

// NOTE: update Password with current user
exports.updatepassword = catchAsync(async (req, res, next) => {
  // 1) Get user from the database
  const user = await usersModel.findOne({
    condition: 'u.id',
    field: req.user.id,
  });

  // 2) check if POSTed current password is correct
  if (
    !(await usersModel.correctPassword(req.body.currentpassword, user.password))
  ) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  const hash = await bcrypt.hashSync(req.body.password, 12);
  // 3) if so, update password and hash
  const changes = {
    password: hash,
    updatedAt: Date.now() - 1000,
  };
  await usersModel.findByIdandUpdate(user.id, changes);

  // 4) log user in,sent jwt
  createTokenandSent(user, 201, res);
});
