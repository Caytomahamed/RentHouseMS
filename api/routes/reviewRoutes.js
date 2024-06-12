const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

// review by propertyId
router.get('/:propertyId/property', reviewController.getReviewsByProperty);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);

router
  .route(':/id')
  .get(reviewController.getOneReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
