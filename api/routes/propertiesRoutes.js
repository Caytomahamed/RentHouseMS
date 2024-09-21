const express = require('express');
const authController = require('../controllers/authController');
const propertiesController = require('../controllers/propertiesController');
const fileUpload = require('../utils/uploadFile');

const router = express.Router();

router.get('/search', propertiesController.searching);

router.get('/:landlordId/properties', propertiesController.getByLandlordId);

router
  .route('/')
  .get(propertiesController.getAll)
  .post(fileUpload.propertyImages, propertiesController.createProperties);

router
  .route('/:id')
  .get(propertiesController.getOne)
  .patch(fileUpload.propertyImages, propertiesController.updateProperty)
  .delete(propertiesController.deleteOne);

module.exports = router;
