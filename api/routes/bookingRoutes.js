const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/now', authController.proctect, bookingController.bookingNow);

router.post('/paid', authController.proctect, bookingController.paidNow);

// reject and confirm booking
router.patch(
  '/:bookingId/reject',
  authController.proctect,
  bookingController.reject,
);

router.patch(
  '/:bookingId/confirm',
  authController.proctect,
  bookingController.confirm,
);

// get current users booked schedule
router.get(
  '/booked',
  authController.proctect,
  bookingController.getBookingByUserId,
);

// get landlord's property booked
router.get(
  '/:landlordId/landlord',
  // authController.proctect,
  bookingController.getBookingByLandlordId,
);

// get by tenant id
router.get(
  '/:tenantId/tenant',
  authController.proctect,
  bookingController.getBookingByTenantId,
);

// unbooking
router.delete(
  '/:bookingId/unBooking',
  authController.proctect,
  bookingController.unBooking,
);

// request cancellation
router.patch(
  '/:bookingId/requestCancellation',
  authController.proctect,
  bookingController.cancellation,
);

router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
