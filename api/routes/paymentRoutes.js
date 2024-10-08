const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/:landlordId/landlord', paymentController.getPaymentByLandlordId);
router.get('/:tenantId/tenant', paymentController.getByTanantId);

router.route('/').get(paymentController.getAllPayments);
//   .post(paymentController.createPayment);

router
  .route('/:id')
  .get(paymentController.getOnePayment)
  .patch(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

module.exports = router;
