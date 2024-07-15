const inboxModel = require('../models/inboxModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getInboxByUserId = catchAsync(async (req, res, next) => {
  const { userId, all } = req.params;
  const inbox = await inboxModel.findInboxByUserId(userId, all);

  if (!inbox) {
    return next(new appError('No inbox found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: inbox,
  });
});

exports.getInboxByUserIdNotReading = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const unreadCount = await inboxModel.findInboxByUserIdNotReading(userId);

  console.log('unread', unreadCount);

  res.status(200).json({
    status: 'success',
    data: unreadCount,
  });
});

exports.createInbox = handleFactory.createOne(inboxModel);
exports.deleteInbox = handleFactory.deleteOne(inboxModel);
