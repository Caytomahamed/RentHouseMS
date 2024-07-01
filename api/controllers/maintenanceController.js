const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

const maintanceModal = require('../models/maintenanceModal');
const bookingModel = require('../models/bookingModel');
const { addDaysToDate, formatDate } = require('../utils/timeHelpers');

// creaate maintanace
// 1. check if this booking exit.2. req maintance
exports.createMaintenance = catchAsync(async (req, res, next) => {
  const { bookingId, tenantId, type, description } = req.body;
  console.log(bookingId);
  const booking = await bookingModel.findById(bookingId);

  if (!booking.length) {
    return next(new appError('Booking not found', 404));
  }

  const expectedDate = formatDate(new Date(addDaysToDate(new Date(), 3)));

  const [maintanceCreated] = await maintanceModal.create({
    bookingId,
    tenantId,
    type,
    description,
    status: 'requested',
    expectedDate,
  });

  if (!maintanceCreated) {
    return next(new appError('Maintenance not created', 404));
  }

  res.status(200).json({
    status: 'success',
    data: maintanceCreated,
  });
});

//get landlord id
exports.getMaintenanceByLandlordId = catchAsync(async (req, res, next) => {
  const { landlordId } = req.params;
  const maintance = await maintanceModal.findByLandlordId(landlordId);

  if (!maintance) {
    return next(new appError('Maintenance not found', 404));
  }

  res.status(200).json({
    status: 'success',
    result: maintance.length,
    data: maintance,
  });
});

// mark as completed
exports.markAsCompleted = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const maintance = await maintanceModal.markAsCompleted(id);

  if (!maintance) {
    return next(new appError('Maintenance not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: maintance,
  });
});

exports.getAllMaintenance = handleFactory.getAll(maintanceModal);
exports.getOneMaintenance = handleFactory.getOne(maintanceModal);
exports.updateMaintenance = handleFactory.updateOne(maintanceModal);
exports.deleteMaintenance = handleFactory.deleteOne(maintanceModal);
