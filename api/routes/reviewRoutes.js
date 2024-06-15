const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

// review by propertyId
router.get('/:propertyId/property', reviewController.getReviewsByProperty);

router.get('/:tenantId/tenant', reviewController.getReviewsByTenantId);

router.get(
  '/:tenantId/tenant/:propertyId/property',
  reviewController.getReviewsByTenantIdInProperty,
);

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
