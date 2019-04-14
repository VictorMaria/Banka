'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bankAccountSchema = {
  owner: _joi2.default.number().positive().required(),
  firstName: _joi2.default.string().required(),
  lastName: _joi2.default.string().required(),
  email: _joi2.default.string().email().required(),
  type: _joi2.default.string().regex(/^savings$|^current$/).required(),
  openingBalance: _joi2.default.string().regex(/^[0-9]+\.[0-9]{2}$/).required()
};
exports.default = bankAccountSchema;