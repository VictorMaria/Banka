import multer from 'multer';

const photoStorage = multer.diskStorage(
  {
    destination: (req, file, callback) => {
      callback(null, './server/uploads');
    },
    filename: (req, file, callback) => {
      callback(null, new Date().toISOString() + file.originalname);
    },
  },
);

const checkFileType = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/png'
    || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer(
  {
    storage: photoStorage,
    limits: { fileSize: 5000100 },
    fileFilter: checkFileType,
  },
);

export default upload;
