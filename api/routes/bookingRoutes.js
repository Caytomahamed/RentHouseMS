const express = require('express');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/now', authController.proctect, bookingController.bookingNow);

// get current users booked schedule
router.get(
  '/booked',
  authController.proctect,
  bookingController.getBookingByUserId,
);


// unbooking
router.delete(
  '/:bookingId/unBooking',
  authController.proctect,
  bookingController.unBooking,
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
