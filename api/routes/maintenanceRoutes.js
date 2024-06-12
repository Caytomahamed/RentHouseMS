const express = require('express');

const maintanceController = require('../controllers/maintenanceController');

const router = express.Router();

router
  .route('/')
  .get(maintanceController.getAllMaintenance)
  .post(maintanceController.createMaintenance);

router
  .route('/:id')
  .get(maintanceController.getOneMaintenance)
  .patch(maintanceController.updateMaintenance)
  .delete(maintanceController.deleteMaintenance);

module.exports = router;
