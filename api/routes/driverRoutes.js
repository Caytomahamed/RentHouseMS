const express = require('express');
const driverController = require('../controllers/driverController');

const router = express.Router();

router
  .route('/')
  .get(driverController.getAllDrivers)
  .post(driverController.imageUpload, driverController.createDriver);

router
  .route('/:id')
  .get(driverController.getDriverById)
  .patch(driverController.updateDriver);

module.exports = router;
