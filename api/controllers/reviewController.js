const reviewModel = require('../models/reviewModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');

exports.getReviewsByProperty = async (req, res) => {
  const { propertyId } = req.params;
  const reviews = await reviewModel.findReviewsByPropertyId(propertyId);

  if (!reviews) {
    return next(new appError('No reviews found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: reviews,
  });
};

exports.getAllReviews = handleFactory.getAll(reviewModel);
exports.getOneReview = handleFactory.getOne(reviewModel);
exports.updateReview = handleFactory.updateOne(reviewModel);
exports.deleteReview = handleFactory.deleteOne(reviewModel);
exports.createReview = handleFactory.createOne(reviewModel);
