const handleFactory = require('./handleFactory');
const propertiesModel = require('../models/propertiesModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

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
    result: properties.length,
    data: properties,
  });
});

exports.updateProperty = catchAsync(async (req, res, next) => {
  // const
  const files = req.files;
  const body = JSON.parse(req.body.body);
  const { id, ...changes } = body;

  files;

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
    result: properties.length,
    data: properties,
  });
});

// get by landlorid id
exports.getByLandlordId = catchAsync(async (req, res, next) => {
  'landlord properties', req.params;
  const properties = await propertiesModel.findByLandlordId(
    req.params.landlordId,
  );

  if (!properties) {
    return next(new appError('OH! no property found'));
  }

  res.status(200).json({
    status: 'success',
    result: properties.length,
    data: properties,
  });
});

exports.getAllProperties = handleFactory.getAll(propertiesModel);
exports.getProperty = handleFactory.getOne(propertiesModel);
exports.deleteProperty = handleFactory.deleteOne(propertiesModel);
exports.searchProperties = handleFactory.searching(propertiesModel);
