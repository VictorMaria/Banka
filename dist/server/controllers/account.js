'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

var _bankAccountValidation = require('../validation/bankAccountValidation');

var _bankAccountValidation2 = _interopRequireDefault(_bankAccountValidation);

var _transactionValidation = require('../validation/transactionValidation');

var _transactionValidation2 = _interopRequireDefault(_transactionValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var account = {
  createBankAccount: function createBankAccount(req, res) {
    var result = _joi2.default.validate(req.body, _bankAccountValidation2.default);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    var bankAccount = _account2.default.createBankAccount(req.body);
    return res.status(201).send({ status: 201, data: bankAccount });
  },
  findBankAccount: function findBankAccount(req, res) {
    var bankAccount = _account2.default.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    return res.status(200).send({ status: 200, data: bankAccount });
  },
  activateDeactivate: function activateDeactivate(req, res) {
    var bankAccount = _account2.default.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    var activateDeactivate = _account2.default.activateDeactivate(req.params.accountNumber);
    return res.status(200).send({ status: 200, data: activateDeactivate });
  },
  checkBalance: function checkBalance(req, res) {
    var bankAccount = _account2.default.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    var balance = _account2.default.checkBalance(req.params.accountNumber);
    return res.status(200).send({ status: 200, data: balance });
  },
  creditAccount: function creditAccount(req, res) {
    var bankAccount = _account2.default.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    var result = _joi2.default.validate(req.body, _transactionValidation2.default);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    var creditAccount = _account2.default.creditAccount(req.params.accountNumber, req.body);
    return res.status(201).send({ status: 201, data: creditAccount });
  },
  debitAccount: function debitAccount(req, res) {
    var bankAccount = _account2.default.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    var result = _joi2.default.validate(req.body, _transactionValidation2.default);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    var debitAccount = _account2.default.debitAccount(req.params.accountNumber, req.body);
    if (debitAccount === 'Insufficient Funds') {
      return res.status(400).send({ status: 400, error: debitAccount });
    }
    return res.status(201).send({ status: 201, data: debitAccount });
  },
  deleteBankAccount: function deleteBankAccount(req, res) {
    var bankAccount = _account2.default.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    var deleteBankAccount = _account2.default.deleteBankAccount(req.params.accountNumber);
    return res.status(200).send({ status: 200, message: deleteBankAccount });
  }
};
exports.default = account;