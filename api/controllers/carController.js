const handleFactory = require('./handleFactory');
const carModel = require('../models/carModel');
const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename =
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
    req.filename = filename;
  },
});

const upload = multer({ storage: storage });

exports.imageUpload = upload.single('file');

exports.createCar = catchAsync(async (req, res, next) => {
  const file = req.file;
  const data = JSON.parse(req.body.body);

  const insert = { ...data, carImg: `${req.filename}` };

  const [user] = await carModel.create(insert);

  if (!user) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});

exports.getAllCars = handleFactory.getAll(carModel);
exports.getCarById = handleFactory.getOne(carModel);
exports.updateCar = handleFactory.updateOne(carModel);
// exports.createCar = handleFactory.createOne(carModel);
exports.deleteCar = handleFactory.deleteOne(carModel);
