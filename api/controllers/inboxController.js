const inboxModel = require('../models/inboxModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getInboxByUserId = catchAsync(async (req, res, next) => {
  const { tenantId } = req.params;
  const inbox = await inboxModel.findInboxByUserId(tenantId);

  if (!inbox) {
    return next(new appError('No inbox found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: inbox,
  });
});

exports.getInboxByUserIdNotReading = catchAsync(async (req, res, next) => {
  const { tenantId } = req.params;
  const unreadCount = await inboxModel.findInboxByUserIdNotReading(tenantId);

  res.status(200).json({
    status: 'success',
    data: unreadCount,
  });
});

exports.createInbox = handleFactory.createOne(inboxModel);
exports.deleteInbox = handleFactory.deleteOne(inboxModel);
