const Controller = require('./controller');
const propertiesModel = require('../models/propertiesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class PropertiesController extends Controller {
  constructor() {
    super(propertiesModel);
  }

  createProperties = catchAsync(async (req, res, next) => {
    const files = req.files;
    const body = JSON.parse(req.body.body);
    const extractedFilenames = files.map(file => file.filename);

    if (!extractedFilenames || !extractedFilenames.length) {
      return next(new AppError('OH! no image file found'));
    }
    const properties = await this.Model.create({
      ...body,
      imageUrls: JSON.stringify(extractedFilenames),
    });

    if (!properties) {
      return next(
        new AppError('OH! something went wrong. Please try again later'),
      );
    }

    res.status(200).json({
      status: 'success',
      result: properties.length,
      data: properties,
    });
  });

  updateProperty = catchAsync(async (req, res, next) => {
    const files = req.files;
    const body = JSON.parse(req.body.body);
    const { id, ...changes } = body;

    let properties;

    if (files && files.length > 0) {
      const extractedFilenames = files.map(file => file.filename);

      if (!extractedFilenames || !extractedFilenames.length) {
        return next(new AppError('OH! no image file found'));
      }
      properties = await this.Model.findByIdAndUpdate(id, {
        ...changes,
        imageUrls: JSON.stringify(extractedFilenames),
      });
    } else {
      properties = await this.Model.findByIdAndUpdate(id, changes);
    }

    if (!properties) {
      return next(
        new AppError('OH! something went wrong. Please try again later'),
      );
    }

    res.status(200).json({
      status: 'success',
      result: properties.length,
      data: properties,
    });
  });

  getByLandlordId = catchAsync(async (req, res, next) => {
    const properties = await this.Model.findByLandlordId(req.params.landlordId);

    if (!properties) {
      return next(new AppError('OH! no property found'));
    }

    res.status(200).json({
      status: 'success',
      result: properties.length,
      data: properties,
    });
  });
}

module.exports = new PropertiesController();
