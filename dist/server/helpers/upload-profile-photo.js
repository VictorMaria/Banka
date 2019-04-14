'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var photoStorage = _multer2.default.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, './server/uploads');
  },
  filename: function filename(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});

var checkFileType = function checkFileType(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = (0, _multer2.default)({
  storage: photoStorage,
  limits: { fileSize: 5000100 },
  fileFilter: checkFileType
});

exports.default = upload;