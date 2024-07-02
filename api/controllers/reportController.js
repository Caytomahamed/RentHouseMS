const handleFactory = require('./handleFactory');
const reportModel = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getAllReports = catchAsync(async (req, res, next) => {
  const { reportType } = req.params;
  const reports = await reportModel.findReports(reportType);

  if (!reports) {
    return next(new appError('No reports found.Invalid report type', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      reports,
    },
  });
});

exports.getByLandlord = catchAsync(async (req, res, next) => {
  const { landlordId } = req.params;
  const reports = await reportModel.findReportsByLandlord(landlordId);

  if (!reports) {
    return next(new appError('No reports found.Invalid landlord id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      reports,
    },
  });
});

exports.getByAdmin = catchAsync(async (req, res, next) => {
  const reports = await reportModel.findReportsByAdmin();

  console.log('me', reports);

  if (!reports) {
    return next(new appError('No reports found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      reports,
    },
  });
});

exports.getAllTransportationReport = handleFactory.getAll(reportModel);
