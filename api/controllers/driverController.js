const handleFactory = require('./handleFactory');
const driverModel = require('../models/driverModal');
const path = require('path');

const multer = require('multer');
const catchAsync = require('../utils/catchAsync');

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

exports.createDriver = catchAsync(async (req, res, next) => {
  const file = req.file;
  const data = JSON.parse(req.body.body);

  const insert = { ...data, imageUrl: `${req.filename}` };

  const [user] = await driverModel.create(insert);

  if (!user) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});

exports.getAllDrivers = catchAsync(async (req, res, next) => {
  const doc = await driverModel.find();
  if (doc.length === 0) {
    return next(new AppError('No document found!', 401));
  }

  console.log(doc);
  res.status(200).json({
    status: 'sucess',
    data: doc,
  });
});

// exports.getAllDrivers = handleFactory.getAll(driverModel);
exports.getDriverById = handleFactory.getOne(driverModel);
exports.updateDriver = handleFactory.updateOne(driverModel);
// exports.createCar = handleFactory.createOne(carModel);
// exports.deleteCar = handleFactory.deleteOne(carModel);
