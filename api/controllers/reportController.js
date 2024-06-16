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

exports.getAllTransportationReport = handleFactory.getAll(reportModel);
