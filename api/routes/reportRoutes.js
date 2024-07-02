const express = require('express');

const reportController = require('../controllers/reportController');

const router = express.Router();

router.route('/:landlordId/landlord').get(reportController.getByLandlord);
router.route('/admin').get(reportController.getByAdmin);
router.route('/:reportType').get(reportController.getAllReports);

router.route('/').get(reportController.getAllTransportationReport);

module.exports = router;
