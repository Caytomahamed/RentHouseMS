const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

class Controller {
  constructor(Model) {
    this.Model = Model;
  }

  deleteOne = catchAsync(async (req, res, next) => {
    const doc = await this.Model.findByIdandDelete(+req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      message: 'success',
      data: 'successfully deleted',
    });
  });

  updateOne = catchAsync(async (req, res, next) => {
    const doc = await this.Model.findByIdandUpdate(+req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

  createOne = catchAsync(async (req, res, next) => {
    const body = JSON.parse(req.body.body);
    const [doc] = await this.Model.create(body);

    if (!doc) {
      return next(
        new AppError(
          "You can't create this document. Something went wrong. Please add all required fields.",
          404,
        ),
      );
    }

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

  getOne = catchAsync(async (req, res, next) => {
    const [doc] = await this.Model.findById(+req.params.id);

    console.log('proerties', doc);

    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

  getAll = catchAsync(async (req, res, next) => {
    const docs = await this.Model.find();

    if (!docs || docs.length === 0) {
      return next(new AppError('OH! No document found. Please try again', 404));
    }

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: docs,
    });
  });

  searching = catchAsync(async (req, res, next) => {
    const docs = await this.Model.searching(req.query);

    if (!docs || docs.length === 0) {
      return next(new AppError('OH! No document found. Please try again', 404));
    }

    res.status(200).json({
      status: 'success',
      result: docs.length,
      data: docs,
    });
  });
}

module.exports = Controller;
