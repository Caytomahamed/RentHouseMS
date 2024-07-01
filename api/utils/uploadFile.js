const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    'ddddddddddd', file;
    const filename =
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
    req.filename = filename;
    'upload', file;
  },
});

const upload = multer({ storage: storage });

exports.imageUpload = upload.single('file');
exports.propertyImages = upload.array('file', 3);
