const handleFactory = require('./handleFactory');
const propertiesModel = require('../models/propertiesModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getRecovery = catchAsync(async (req, res, next) => {
  const schedules = await propertiesModel.findRecovery();

  if (!schedules.length) {
    return next(new appError('OH! no recovery car is avaible'));
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

exports.getToDaySchedule = catchAsync(async (req, res, next) => {
  const schedules = await propertiesModel.todaySchedules();

  if (!schedules) {
    return next(
      new appError('OH! no schedule to day.Please check to tomorrow'),
    );
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

exports.getTomorrowSchedule = catchAsync(async (req, res, next) => {
  const schedules = await propertiesModel.tomorrowSchedules();

  if (!schedules) {
    return next(new appError('OH! no schedule to day.Please check this week'));
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

exports.getThisWeek = catchAsync(async (req, res, next) => {
  const schedules = await propertiesModel.weekSchedules();

  if (!schedules) {
    return next(
      new appError('OH! no schedule to day.Please check to Next week'),
    );
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

// Find all schedules with user details
exports.findAllSchedulesWithDetailsController = catchAsync(
  async (req, res, next) => {
    const schedules = await propertiesModel.findAllSchedulesWithDetails();
    if (!schedules) {
      return next(
        new appError('OH! no schedule to found .Please check to Next week'),
      );
    }
    res.status(200).json({
      status: 'success',
      data: schedules,
    });
  },
);
// Find all schedules with user details
exports.getSchedulesWithByAddress = catchAsync(async (req, res, next) => {
  // const
  const address = { start: req.user.address };
  console.log(address);
  const schedules = await propertiesModel.searching(address);

  if (!schedules) {
    return next(
      new appError('OH! no schedule to found.Please check your location'),
    );
  }

  const doc = schedules.slice(0, 4);
  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.createProperties = catchAsync(async (req, res, next) => {
  // const
  const files = req.files;
  const body = JSON.parse(req.body.body);
  const extractedFilenames = files.map(file => file.filename);

  if (!extractedFilenames || !extractedFilenames.length) {
    return next(new appError('OH! no image file found'));
  }
  const properties = await propertiesModel.create({
    ...body,
    imageUrls: JSON.stringify(extractedFilenames),
  });

  if (!properties) {
    return next(
      new appError('OH! something went wrong.Please try again later'),
    );
  }

  // const doc = schedules.slice(0, 4);
  res.status(200).json({
    status: 'success',
    data: properties,
  });
});
// exports.createProperties = catchAsync(async (req, res, next) => {
//   const { body } = req.body; // Assuming your JSON data is in 'body' field of the form data
//   const files = req.files; // Access uploaded files array
//   console.log(req.body);
//   // Handle the files and data as needed (e.g., save file paths to database)
//   console.log('body', body);
//   console.log('files', req.filename);

//   res.status(200).json({
//     status: 'success',
//     data: { ...body, files },
//   });
// });

exports.updateProperty = catchAsync(async (req, res, next) => {
  // const
  const files = req.files;
  const body = JSON.parse(req.body.body);
  const { id, ...changes } = body;

  console.log(files);

  let properties;

  if (files && files.length > 0) {
    const extractedFilenames = files.map(file => file.filename);

    if (!extractedFilenames || !extractedFilenames.length) {
      return next(new appError('OH! no image file found'));
    }
    properties = await propertiesModel.findByIdandUpdate(id, {
      ...changes,
      imageUrls: JSON.stringify(extractedFilenames),
    });
  } else {
    properties = await propertiesModel.findByIdandUpdate(id, changes);
  }

  if (!properties) {
    return next(
      new appError('OH! something went wrong.Please try again later'),
    );
  }

  // const doc = schedules.slice(0, 4);
  res.status(200).json({
    status: 'success',
    data: properties,
  });
});

exports.getAllProperties = handleFactory.getAll(propertiesModel);
exports.getProperty = handleFactory.getOne(propertiesModel);
exports.deleteProperty = handleFactory.deleteOne(propertiesModel);
exports.searchProperties = handleFactory.searching(propertiesModel);
