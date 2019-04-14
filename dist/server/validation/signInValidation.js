'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signInSchema = {
  email: _joi2.default.string().email().required(),
  password: _joi2.default.string().required()
};
exports.default = signInSchema;