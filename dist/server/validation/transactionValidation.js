'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transactionSchema = {
  cashier: _joi2.default.number().positive().required(),
  remark: _joi2.default.string().max(25).required(),
  amount: _joi2.default.string().regex(/^[0-9]+\.[0-9]{2}$/).required()
};
exports.default = transactionSchema;