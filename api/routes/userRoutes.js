const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
// const courseRoute = require('./courseRoutes');
const uploadFile = require('../utils/uploadFile');

const router = express.Router();

router.post(
  '/signup',
  authController.checkRoleIfIsAdmin,
  authController.checkPasswordConfirm,
  authController.checkIsEmailValid,
  authController.signup,
);

router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post(
  '/forgotpassword',
  authController.checkIsIfEmailExist,
  authController.forgetPassword,
);
router.patch(
  '/resetPassword/:token',
  authController.checkPasswordConfirm,
  authController.resetPassword,
);

router.patch(
  '/updateMyPassword',
  authController.proctect,
  authController.checkPasswordConfirm,
  authController.updatepassword,
);
router.get(
  '/notify',
  authController.proctect,
  userController.getUserNotification,
);

// router.post('/upload');

// Protect all routes after this middleware
// router.use(authController.proctect);

//GET : /:userID/courses
router.use(
  '/:id/courses',
  authController.restrictTo('admin', 'instructor'),
  //   courseRoute,
);

router.get('/dash', userController.summaryDash);

router.get('/tenants', userController.getTenants);
router.get('/landlord', userController.getLandLord);

// //POST : /:userID/courses
// router.use(
//   '/:id/courses',
//   authController.restrictTo('admin', 'instructor'),
//   courseRoute,
// );

// // Only access with Admin after this middleware
// router.use(authController.restrictTo('admin'));

router.get('/getUserInfo', authController.proctect, userController.getUserInfo);

// update me
router.patch('/updateMe', authController.proctect, userController.updateMe);

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(uploadFile.imageUpload, userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
