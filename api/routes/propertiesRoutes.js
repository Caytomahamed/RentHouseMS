const express = require('express');
const authController = require('../controllers/authController');
const propertiesController = require('../controllers/propertiesController');
const fileUpload = require('../utils/uploadFile');

const router = express.Router();

router.get(
  '/search',
  authController.proctect,
  propertiesController.searchProperties,
);
router.get(
  '/recovery',
  // authController.proctect,
  propertiesController.getRecovery,
);
router.get(
  '/address',
  authController.proctect,
  propertiesController.getSchedulesWithByAddress,
);

router
  .route('/')
  .get(propertiesController.getAllProperties)
  .post(fileUpload.propertyImages, propertiesController.createProperties);

router
  .route('/:id')
  .get(propertiesController.getSchedule)
  .patch(fileUpload.propertyImages, propertiesController.updateProperty)
  .delete(propertiesController.deleteProperty);

module.exports = router;
