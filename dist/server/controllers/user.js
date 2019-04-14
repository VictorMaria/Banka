'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _signUpValidation = require('../validation/signUpValidation');

var _signUpValidation2 = _interopRequireDefault(_signUpValidation);

var _signInValidation = require('../validation/signInValidation');

var _signInValidation2 = _interopRequireDefault(_signInValidation);

var _helpers = require('../helpers/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = {
  signUp: function signUp(req, res) {
    var result = _joi2.default.validate(req.body, _signUpValidation2.default);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    var checkUser = _user2.default.checkForEmail(req.body);
    if (checkUser) {
      return res.status(400).send({ status: 400, error: 'Email already in use' });
    }
    var newUser = _user2.default.signUp(req.body);
    return res.status(201).send({ status: 201, data: newUser });
  },
  signIn: function signIn(req, res) {
    var result = _joi2.default.validate(req.body, _signInValidation2.default);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    var checkUser = _user2.default.checkForEmail(req.body);
    if (!checkUser) {
      return res.status(400).send({ status: 400, error: 'Incorrect Email' });
    }
    if (!_helpers2.default.comparePassword(checkUser.password, req.body.password)) {
      return res.status(400).send({ status: 400, error: 'Incorrect Password' });
    }
    var signInResponse = _user2.default.signIn(req.body);
    return res.status(200).send({ status: 200, data: signInResponse });
  },
  getUser: function getUser(req, res) {
    var checkUser = _user2.default.getUser(req.params.id);
    if (!checkUser) {
      return res.status(404).send({ status: 404, error: 'User not found' });
    }
    return res.status(200).send({ status: 200, data: checkUser });
  },
  quickCheck: function quickCheck(req, res, next) {
    var checkUser = _user2.default.quickCheck(req.params.id);
    if (!checkUser) {
      return res.status(404).send({ status: 404, error: 'User not found' });
    }
    return next();
  },
  uploadProfilePhoto: function uploadProfilePhoto(req, res) {
    var response = _user2.default.uploadProfilePhoto(req.params.id, req.file);
    if (response === 'Select an Image') {
      return res.status(400).send({ status: 400, error: 'Select an Image' });
    }
    return res.status(200).send({ status: 200, data: response });
  }
};

exports.default = user;