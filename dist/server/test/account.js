'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
/* eslint-disable quotes */
_chai2.default.use(require('chai-http'));

// Tests for creating a new bank account
describe('Creating a bank acocunt', function () {
  var emptyOwnerField = {
    owner: '',
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var missingOwnerField = {
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var emptyFirstNameField = {
    owner: 1,
    firstName: '',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var missingFirstNameField = {
    owner: 1,
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var emptyLastNameField = {
    owner: 1,
    firstName: 'Victor',
    lastName: '',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var missingLastNameField = {
    owner: 1,
    firstName: 'Victor',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var emptyEmailField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: '',
    type: 'savings',
    openingBalance: '200.00'
  };

  var missingEmailField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    type: 'savings',
    openingBalance: '200.00'
  };

  var invalidEmail = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomioutlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };

  var emptyTypeField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: '',
    openingBalance: '200.00'
  };

  var missingTypeField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    openingBalance: '200.00'
  };

  var invalidType = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'dollar',
    openingBalance: '200.00'
  };

  var emptyOpeningBalanceField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: ''
  };

  var missingOpeningBalanceField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings'
  };

  var invalidOpeningBalance = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.0'
  };
  var completeDetails = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00'
  };
  var completeDetailsTwo = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'current',
    openingBalance: '10000.00'
  };

  it('Should return an error stating owner must be a number', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(emptyOwnerField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"owner" must be a number');
      done();
    });
  });

  it('Should return an error stating owner field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(missingOwnerField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"owner" is required');
      done();
    });
  });

  it('Should return an error for empty firstName field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(emptyFirstNameField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"firstName" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating firstName field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(missingFirstNameField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"firstName" is required');
      done();
    });
  });

  it('Should return an error for empty lastName field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(emptyLastNameField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"lastName" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating lastName field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(missingLastNameField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"lastName" is required');
      done();
    });
  });

  it('Should return an error for empty email field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(emptyEmailField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating email field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(missingEmailField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" is required');
      done();
    });
  });

  it('Should return an error for an invalid email', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(invalidEmail).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" must be a valid email');
      done();
    });
  });

  it('Should return an error for empty type field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(emptyTypeField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"type" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating type field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(missingTypeField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"type" is required');
      done();
    });
  });

  it('Should return an error for invalid account type', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(invalidType).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"type" with value "dollar" fails to match the required pattern: /^savings$|^current$/');
      done();
    });
  });

  it('Should return an error for empty openingBalance field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(emptyOpeningBalanceField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"openingBalance" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating openingBalance field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(missingOpeningBalanceField).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"openingBalance" is required');
      done();
    });
  });
  it('Should return an error for invalid openingBalance entry', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(invalidOpeningBalance).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"openingBalance" with value "200.0" fails to match the required pattern: /^[0-9]+\\.[0-9]{2}$/');
      done();
    });
  });
  it('Should return an object with key-value pairs upon sending complete and correct details', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(completeDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 201);
      _chai.assert.property(res.body, 'status');
      _chai.assert.property(res.body.data, 'firstName');
      _chai.assert.property(res.body.data, 'firstName');
      _chai.assert.property(res.body.data, 'lastName');
      _chai.assert.property(res.body.data, 'email');
      _chai.assert.property(res.body.data, 'type');
      _chai.assert.property(res.body.data, 'openingBalance');
      _chai.assert.property(res.body.data, 'balance');
      done();
    });
  });
  it('Should return an object with key-value pairs upon sending another set of complete and correct details', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/accounts').send(completeDetailsTwo).end(function (err, res) {
      _chai.assert.equal(res.body.status, 201);
      _chai.assert.property(res.body, 'status');
      _chai.assert.property(res.body.data, 'firstName');
      _chai.assert.property(res.body.data, 'firstName');
      _chai.assert.property(res.body.data, 'lastName');
      _chai.assert.property(res.body.data, 'email');
      _chai.assert.property(res.body.data, 'type');
      _chai.assert.property(res.body.data, 'openingBalance');
      _chai.assert.property(res.body.data, 'balance');
      done();
    });
  });
});

// Test for fetching a specific bank account

describe('Fetching a specific bank account', function () {
  it('Should return an error for a non existent bank account', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/20190022').end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });

  it('Should return an object with key-value pairs for an existing bank account', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/2019001').end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.property(res.body, 'status');
      _chai.assert.property(res.body.data, 'firstName');
      _chai.assert.property(res.body.data, 'firstName');
      _chai.assert.property(res.body.data, 'lastName');
      _chai.assert.property(res.body.data, 'email');
      _chai.assert.property(res.body.data, 'type');
      _chai.assert.property(res.body.data, 'openingBalance');
      _chai.assert.property(res.body.data, 'balance');
      done();
    });
  });
});

// Tests for activating or deactivating a bank account

describe('Activating or deactivating a bank account', function () {
  it('Attempting to activate or deactivate a non existent account should return a 404 error', function (done) {
    _chai2.default.request(_app2.default).patch('/api/v1/accounts/20190022').end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });

  it('Activating a bank account should return an object with key-value pairs', function (done) {
    _chai2.default.request(_app2.default).patch('/api/v1/accounts/2019001').end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.equal(res.body.data.accountNumber, '2019001');
      _chai.assert.equal(res.body.data.status, 'active');
      done();
    });
  });

  it('Deactivating a bank account should return an object with key-value pairs', function (done) {
    _chai2.default.request(_app2.default).patch('/api/v1/accounts/2019001').end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.equal(res.body.data.accountNumber, '2019001');
      _chai.assert.equal(res.body.data.status, 'dormant');
      done();
    });
  });
});

// Tests for checking account balance of a specific bank account
describe('Checking bank account balance', function () {
  it('Attempting to check the balance of a non existent account should return a 404 error', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/20190022/balance').end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });

  it('Checking balance for an exisiting bank account should return correct balance in an object', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/2019001/balance').end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.equal(res.body.data.accountNumber, '2019001');
      _chai.assert.equal(res.body.data.accountBalance, '200.00');
      done();
    });
  });
});

// Tests for credit transactions

var emptyCashier = {
  cashier: '',
  amount: '100.00',
  remark: 'Monthly Interest'
};

var missingCashier = {
  amount: '100.00',
  remark: 'Monthly Interest'
};

var wrongCashier = {
  cashier: 'w',
  amount: '100.00',
  remark: 'Monthly Interest'
};

var wrongAmountPattern = {
  cashier: 1,
  amount: '100.000',
  remark: 'Monthly Interest'
};

var missingAmount = {
  cashier: 1,
  remark: 'Monthly Interest'
};

var emptyRemark = {
  cashier: 1,
  amount: '100.00',
  remark: ''
};

var missingRemark = {
  cashier: 1,
  amount: '100.00'
};

var lengthyRemark = {
  cashier: 1,
  amount: '100.00',
  remark: 'This is a lengthy remark for a transaction'
};

var completeCreditDetails = {
  cashier: 1,
  amount: '1000.00',
  remark: 'Monthly Interest'
};

describe('Credit transcactions', function () {
  it('Should return an error for empty cashier field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(emptyCashier).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"cashier" must be a number');
      done();
    });
  });

  it('Should return an error for missing cashier field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(missingCashier).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"cashier" is required');
      done();
    });
  });

  it('Should return an error for wrong cashier input type', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(wrongCashier).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"cashier" must be a number');
      done();
    });
  });

  it('Should return an error for wrong  amount format', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(wrongAmountPattern).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"amount" with value "100.000" fails to match the required pattern: /^[0-9]+\\.[0-9]{2}$/');
      done();
    });
  });

  it('Should return an error stating amount field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(missingAmount).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"amount" is required');
      done();
    });
  });

  it('Should return an error for empty remark field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(emptyRemark).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"remark" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating remark field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(missingRemark).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"remark" is required');
      done();
    });
  });

  it('Should return an error for a remark of more than 25 characters', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(lengthyRemark).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"remark" length must be less than or equal to 25 characters long');
      done();
    });
  });

  it('Attempting to credit a non existent account should return a 404 error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/20190012/credit').send(completeCreditDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });

  it('Attempting to credit an existing account should return correct account balance and key-pair values in an object', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/credit').send(completeCreditDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 201);
      _chai.assert.equal(res.body.data.accountNumber, '2019001');
      _chai.assert.equal(res.body.data.transactionType, 'Credit');
      _chai.assert.equal(res.body.data.amount, '1000.00');
      _chai.assert.equal(res.body.data.accountBalance, '1200.00');
      _chai.assert.property(res.body.data, 'transactionId');
      _chai.assert.property(res.body.data, 'transactionDate');
      _chai.assert.property(res.body.data, 'amount');
      _chai.assert.property(res.body.data, 'cashier');
      _chai.assert.property(res.body.data, 'remark');
      done();
    });
  });
});

// Tests for debit transaction
var completeDebitDetails = {
  cashier: 1,
  amount: '50.00',
  remark: 'Monthly Due'
};
var excessDebitDetails = {
  cashier: 1,
  amount: '5000.00',
  remark: 'Party'
};

describe('Debit transcactions', function () {
  it('Should return an error for empty cashier field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(emptyCashier).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"cashier" must be a number');
      done();
    });
  });

  it('Should return an error stating cashier field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(missingCashier).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"cashier" is required');
      done();
    });
  });

  it('Should return an error for wrong cashier input type', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(wrongCashier).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"cashier" must be a number');
      done();
    });
  });

  it('Should return an error for wrong  amount format', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(wrongAmountPattern).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"amount" with value "100.000" fails to match the required pattern: /^[0-9]+\\.[0-9]{2}$/');
      done();
    });
  });

  it('Should return an error stating amount field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(missingAmount).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"amount" is required');
      done();
    });
  });

  it('Should return an error for empty remark field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(emptyRemark).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"remark" is not allowed to be empty');
      done();
    });
  });

  it('Should return an error stating remark field is required', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(missingRemark).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"remark" is required');
      done();
    });
  });

  it('Should return an error for a remark of more than 25 characters', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(lengthyRemark).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"remark" length must be less than or equal to 25 characters long');
      done();
    });
  });

  it('Attempting to debit a non existent account should return a 404 error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/20190012/debit').send(completeDebitDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });

  it('Attempting to debit an amount greater than the account balance should return an error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(excessDebitDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, 'Insufficient Funds');
      done();
    });
  });
  it('Attempting to debit an existing account should return correct account balance and key-pair values in an object', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/transactions/2019001/debit').send(completeDebitDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 201);
      _chai.assert.equal(res.body.data.accountNumber, '2019001');
      _chai.assert.equal(res.body.data.transactionType, 'Debit');
      _chai.assert.equal(res.body.data.amount, '50.00');
      _chai.assert.equal(res.body.data.accountBalance, '1150.00');
      _chai.assert.property(res.body.data, 'transactionId');
      _chai.assert.property(res.body.data, 'transactionDate');
      _chai.assert.property(res.body.data, 'amount');
      _chai.assert.property(res.body.data, 'cashier');
      _chai.assert.property(res.body.data, 'remark');
      done();
    });
  });
});

// Tests for deleting a specific bank account
describe('Deleting a bank account', function () {
  it('Attempting to delete a non existing bank account should return a 404 message', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/accounts/201900').end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });

  it('Deleting a bank accout should return a message about the action', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/accounts/2019002').end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.equal(res.body.message, 'Bank Account 2019002 Successfully Deleted');
      done();
    });
  });

  it('Accesing a deleted bank account should return a 404 message', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/2019002').end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'Bank Account not found');
      done();
    });
  });
});