'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _account = require('../controllers/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/accounts', _account2.default.createBankAccount);
router.get('/accounts/:accountNumber', _account2.default.findBankAccount);
router.patch('/accounts/:accountNumber', _account2.default.activateDeactivate);
router.get('/accounts/:accountNumber/balance', _account2.default.checkBalance);
router.post('/transactions/:accountNumber/credit', _account2.default.creditAccount);
router.post('/transactions/:accountNumber/debit', _account2.default.debitAccount);
router.delete('/accounts/:accountNumber', _account2.default.deleteBankAccount);

exports.default = router;