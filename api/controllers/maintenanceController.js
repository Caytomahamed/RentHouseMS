const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const maintanceModal = require('../models/maintenanceModal');
const bookingModel = require('../models/bookingModel');

// creaate maintanace
// 1. check if this booking exit.2. req maintance
exports.createMaintenance = catchAsync(async (req, res, next) => {
  const { bookingId, propertyId, tenantId, type, description } = req.body;
  const [booking] = await bookingModel.findById(bookingId);

  if (!booking) {
    return next(new appError('Booking not found', 404));
  }

  const [maintanceCreated] = await maintanceModal.create({
    propertyId,
    tenantId,
    type,
    description,
    dateSubmitted: new Date(),
    status: 'open',
  });

  console.log(maintanceCreated);

  if (!maintanceCreated) {
    return next(new appError('Maintenance not created', 404));
  }

  res.status(200).json({
    status: 'success',
    data: maintanceCreated,
  });
});

exports.getAllMaintenance = handleFactory.getAll(maintanceModal);
exports.getOneMaintenance = handleFactory.getOne(maintanceModal);
exports.updateMaintenance = handleFactory.updateOne(maintanceModal);
exports.deleteMaintenance = handleFactory.deleteOne(maintanceModal);
