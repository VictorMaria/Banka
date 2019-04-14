'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable max-len */


var _postals = require('../helpers/postals');

var _postals2 = _interopRequireDefault(_postals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function () {
  function Account() {
    _classCallCheck(this, Account);

    this.bankAccounts = [];
    this.transactions = [];
    this.accountUniqueId = 0;
    this.accountNumberUniqueId = 0;
    this.transactionUniqueId = 0;
  }

  _createClass(Account, [{
    key: 'createBankAccount',
    value: function createBankAccount(data) {
      this.accountUniqueId += 1;
      this.accountNumberUniqueId += 1;
      var bankAccount = {
        id: this.bankAccounts.length + this.accountUniqueId,
        accountNumber: '' + (2019000 + this.accountNumberUniqueId),
        owner: data.owner,
        firstName: data.firstName[0].toUpperCase() + data.firstName.slice(1).toLowerCase(),
        lastName: data.lastName[0].toUpperCase() + data.lastName.slice(1).toLowerCase(),
        email: data.email.toLowerCase(),
        createdOn: new Date().toString(),
        type: data.type,
        status: 'draft',
        openingBalance: parseFloat(data.openingBalance),
        balance: parseFloat(data.openingBalance)
      };

      this.bankAccounts.push(bankAccount);
      var response = {
        owner: bankAccount.owner,
        accountNumber: bankAccount.accountNumber,
        firstName: bankAccount.firstName,
        lastName: bankAccount.lastName,
        email: bankAccount.email,
        type: bankAccount.type,
        openingBalance: bankAccount.openingBalance.toFixed(2),
        balance: bankAccount.balance.toFixed(2)
      };
      return response;
    }

    // eslint-disable-next-line consistent-return

  }, {
    key: 'findBankAccount',
    value: function findBankAccount(accountNumber) {
      var bankAccount = this.bankAccounts.find(function (b) {
        return b.accountNumber === accountNumber;
      });
      if (bankAccount) {
        return {
          accountNumber: bankAccount.accountNumber,
          firstName: bankAccount.firstName,
          lastName: bankAccount.lastName,
          email: bankAccount.email,
          type: bankAccount.type,
          openingBalance: bankAccount.openingBalance,
          balance: bankAccount.balance.toFixed(2)
        };
      }
    }
  }, {
    key: 'activateDeactivate',
    value: function activateDeactivate(accountNumber) {
      var bankAccount = this.bankAccounts.find(function (b) {
        return b.accountNumber === accountNumber;
      });
      if (bankAccount.status === 'dormant' || bankAccount.status === 'draft') {
        bankAccount.status = 'active';
      } else {
        bankAccount.status = 'dormant';
      }
      return {
        accountNumber: bankAccount.accountNumber,
        status: bankAccount.status
      };
    }
  }, {
    key: 'checkBalance',
    value: function checkBalance(accountNumber) {
      var bankAccount = this.bankAccounts.find(function (b) {
        return b.accountNumber === accountNumber;
      });
      return {
        accountNumber: bankAccount.accountNumber,
        firstName: bankAccount.firstName,
        lastName: bankAccount.lastName,
        type: bankAccount.type,
        accountBalance: bankAccount.balance.toFixed(2)
      };
    }
  }, {
    key: 'creditAccount',
    value: function creditAccount(accountNumber, data) {
      var bankAccount = this.bankAccounts.find(function (b) {
        return b.accountNumber === accountNumber;
      });
      this.transactionUniqueId += 1;
      bankAccount.balance += parseFloat(data.amount);
      bankAccount.balance = bankAccount.balance.toFixed(2);
      var refinedBalance = bankAccount.balance;
      bankAccount.balance = parseFloat(bankAccount.balance);
      var transaction = {
        transactionId: this.transactionUniqueId,
        accountNumber: bankAccount.accountNumber,
        transactionDate: new Date().toString(),
        amount: parseFloat(data.amount).toFixed(2),
        cashier: data.cashier,
        transactionType: 'Credit',
        remark: data.remark,
        accountBalance: refinedBalance
      };
      this.transactions.push(transaction);
      var emailSubject = transaction.transactionType + ' Alert';
      (0, _postals2.default)(bankAccount.email, emailSubject, transaction.transactionType, transaction.transactionDate, transaction.amount, transaction.remark, transaction.accountBalance);
      return transaction;
    }
  }, {
    key: 'debitAccount',
    value: function debitAccount(accountNumber, data) {
      var bankAccount = this.bankAccounts.find(function (b) {
        return b.accountNumber === accountNumber;
      });
      if (data.amount > bankAccount.balance) {
        return 'Insufficient Funds';
      }
      this.transactionUniqueId += 1;
      bankAccount.balance -= parseFloat(data.amount);
      bankAccount.balance = bankAccount.balance.toFixed(2);
      var refinedBalance = bankAccount.balance;
      bankAccount.balance = parseFloat(bankAccount.balance);
      var transaction = {
        transactionId: this.transactionUniqueId,
        accountNumber: bankAccount.accountNumber,
        transactionDate: new Date().toString(),
        amount: parseFloat(data.amount).toFixed(2),
        cashier: data.cashier,
        transactionType: 'Debit',
        remark: data.remark,
        accountBalance: refinedBalance
      };
      this.transactions.push(transaction);
      var emailSubject = transaction.transactionType + ' Alert';
      (0, _postals2.default)(bankAccount.email, emailSubject, transaction.transactionType, transaction.transactionDate, transaction.amount, transaction.remark, transaction.accountBalance);
      return transaction;
    }
  }, {
    key: 'deleteBankAccount',
    value: function deleteBankAccount(accountNumber) {
      var bankAccount = this.bankAccounts.find(function (b) {
        return b.accountNumber === accountNumber;
      });
      var index = this.bankAccounts.indexOf(bankAccount);
      this.bankAccounts.splice(index, 1);
      var message = 'Bank Account ' + accountNumber + ' Successfully Deleted';
      return message;
    }
  }]);

  return Account;
}();

exports.default = new Account();