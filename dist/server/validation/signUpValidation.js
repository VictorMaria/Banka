'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signUpSchema = {
  email: _joi2.default.string().email().required(),
  firstName: _joi2.default.string().required(),
  lastName: _joi2.default.string().required(),
  password: _joi2.default.string().min(6).required()
};
exports.default = signUpSchema;