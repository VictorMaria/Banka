'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _uploadProfilePhoto = require('../helpers/upload-profile-photo');

var _uploadProfilePhoto2 = _interopRequireDefault(_uploadProfilePhoto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/auth/signup', _user2.default.signUp);
router.post('/auth/signin', _user2.default.signIn);
router.get('/users/:id', _user2.default.getUser);
router.post('/users/:id/profilephotos', _user2.default.quickCheck, _uploadProfilePhoto2.default.single('profilePhoto'), _user2.default.uploadProfilePhoto);

exports.default = router;