const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
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

router.get('/tenants', userController.getTenants);
router.get('/landlord', userController.getLandLord);

// get user info
router.get('/getUserInfo', authController.proctect, userController.getUserInfo);

// update me
router.patch('/updateMe', authController.proctect, userController.updateMe);

router.route('/').get(userController.getAll).post(userController.createOne);

router
  .route('/:id')
  .get(userController.getOne)
  .patch(uploadFile.imageUpload, userController.updateUser)
  .delete(userController.deleteOne);

module.exports = router;
