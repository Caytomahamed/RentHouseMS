const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

router
  .route('/')
  .get(carController.getAllCars)
  .post(carController.imageUpload, carController.createCar);

router
  .route('/:id')
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

module.exports = router;
