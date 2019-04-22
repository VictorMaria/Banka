/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import app from '../../app';
import bankAccountData from './bankAccountData';
import transactionData from './transactionData';

chai.use(require('chai-http'));

// Tests for creating a new bank account
describe('Creating a bank acocunt', () => {
  it('Should return an error stating userID must be a number', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyUserIDField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating userID field is required', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.missingUserIDField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for empty firstName field', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyFirstNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating firstName field is required', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.missingFirstNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for empty lastName field', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyLastNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating lastName field is required', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.missingLastNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyEmailField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating email field is required', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.missingEmailField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.invalidEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for empty type field', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyTypeField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating type field is required', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.missingTypeField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for invalid account type', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.invalidType)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for empty openingBalance field', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyOpeningBalanceField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating openingBalance field is required', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.missingOpeningBalanceField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for invalid openingBalance entry', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.invalidOpeningBalance)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an object with key-value pairs upon sending complete and correct details', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'status');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'lastName');
        assert.property((res.body.data), 'accountNumber');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'type');
        assert.property((res.body.data), 'openingBalance');
        assert.property((res.body.data), 'balance');
        done();
      });
  });
  it('Should return an object with key-value pairs upon sending another set of complete and correct details', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetailsTwo)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'status');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'lastName');
        assert.property((res.body.data), 'accountNumber');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'type');
        assert.property((res.body.data), 'openingBalance');
        assert.property((res.body.data), 'balance');
        done();
      });
  });
});

// Test for fetching a specific bank account

describe('Fetching a specific bank account', () => {
  const staff = {
    email: 'fatima.kamali@outlook.com',
    password: 'bankas',
  };
  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });
  it('Should return an error for a non existent bank account', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/20190022')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });
  let requestedAccountNumber;
  before((done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .end((err, res) => {
        requestedAccountNumber = res.body.data.accountNumber;
        done();
      });
  });
  it('Should return an object with key-value pairs for an existing bank account', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body.data), 'accountNumber');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'lastName');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'type');
        assert.property((res.body.data), 'openingBalance');
        assert.property((res.body.data), 'balance');
        done();
      });
  });
});

// Tests for activating or deactivating a bank account

xdescribe('Activating or deactivating a bank account', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/2019001')
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  const user = {
    email: 'sophie.kamali@outlook.com',
    password: 'bankas',
  };
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('A regular user attempting to activate a bank account should return a 403 error', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/2019001')
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });
  const admin = {
    email: 'john.kamali@outlook.com',
    password: 'bankas',
  };
  let adminToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });
  it('An admin attempting to activate a bank account should return a 403 error', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/2019001')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.status), 'active');
        done();
      });
  });

  const staff = {
    email: 'fatima.kamali@outlook.com',
    password: 'bankas',
  };
  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });
  it('Attempting to activate or deactivate a non existent account should return a 404 error', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/20190022')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Staff attempting to Dectivate a bank account should return an object with key-value pairs', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/2019001')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.status), 'dormant');
        done();
      });
  });

  it('Staff attempting to activate a bank account should return an object with key-value pairs', (done) => {
    chai.request(app)
      .patch('/api/v1/accounts/2019001')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.status), 'active');
        done();
      });
  });
});

// Tests for checking account balance of a specific bank account
xdescribe('Checking bank account balance', () => {
  it('Attempting to check the balance of a non existent account should return a 404 error', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/20190022/balance')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Checking balance for an exisiting bank account should return correct balance in an object', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/2019001/balance')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.accountBalance), '200.00');
        done();
      });
  });
});

// Tests for credit transactions


xdescribe('Credit transcactions', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .send(transactionData.completeCreditDetails)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  const user = {
    email: 'sophie.kamali@outlook.com',
    password: 'bankas',
  };
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('A non staff attempting to credit an account should return a 403 error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', userToken)
      .send(transactionData.completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });

  const staff = {
    email: 'fatima.kamali@outlook.com',
    password: 'bankas',
  };
  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });
  it('Should return an error for empty cashier field', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.emptyCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for missing cashier field', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.missingCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for wrong cashier input type', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.wrongCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for wrong  amount format', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.wrongAmountPattern)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating amount field is required', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.missingAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });


  it('Should return an error for empty remark field', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.emptyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating remark field is required', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.missingRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for a remark of more than 25 characters', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.lengthyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Attempting to credit a non existent account should return a 404 error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/20190012/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Attempting to credit an existing account should return correct account balance and key-pair values in an object', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/credit')
      .set('x-access-token', staffToken)
      .send(transactionData.completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.transactionType), 'Credit');
        assert.equal((res.body.data.amount), '1000.00');
        assert.equal((res.body.data.accountBalance), '1200.00');
        assert.property((res.body.data), 'transactionId');
        assert.property((res.body.data), 'transactionDate');
        assert.property((res.body.data), 'amount');
        assert.property((res.body.data), 'cashier');
        assert.property((res.body.data), 'remark');
        done();
      });
  });
});

// Tests for debit transaction
xdescribe('Debit transcactions', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .send(transactionData.completeDebitDetails)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  const user = {
    email: 'sophie.kamali@outlook.com',
    password: 'bankas',
  };
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('A non staff attempting to debit an account should return a 403 error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', userToken)
      .send(transactionData.completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });

  const staff = {
    email: 'fatima.kamali@outlook.com',
    password: 'bankas',
  };
  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });
  it('Should return an error for empty cashier field', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.emptyCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating cashier field is required', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.missingCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for wrong cashier input type', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.wrongCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for wrong  amount format', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.wrongAmountPattern)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating amount field is required', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.missingAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for empty remark field', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.emptyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error stating remark field is required', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.missingRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for a remark of more than 25 characters', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.lengthyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Attempting to debit a non existent account should return a 404 error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/20190012/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Attempting to debit an amount greater than the account balance should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.excessDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Insufficient Funds');
        done();
      });
  });
  it('Attempting to debit an existing account should return correct account balance and key-pair values in an object', (done) => {
    chai.request(app)
      .post('/api/v1/transactions/2019001/debit')
      .set('x-access-token', staffToken)
      .send(transactionData.completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.transactionType), 'Debit');
        assert.equal((res.body.data.amount), '50.00');
        assert.equal((res.body.data.accountBalance), '1150.00');
        assert.property((res.body.data), 'transactionId');
        assert.property((res.body.data), 'transactionDate');
        assert.property((res.body.data), 'amount');
        assert.property((res.body.data), 'cashier');
        assert.property((res.body.data), 'remark');
        done();
      });
  });
});

// Tests for deleting a specific bank account
xdescribe('Deleting a bank account', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .delete('/api/v1/accounts/2019002')
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  const user = {
    email: 'sophie.kamali@outlook.com',
    password: 'bankas',
  };
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        userToken = res.body.data.token;
        done();
      });
  });
  it('A non admin attempting to delete an existing bank account should return a 403 error', (done) => {
    chai.request(app)
      .delete('/api/v1/accounts/2019002')
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });
  const admin = {
    email: 'john.kamali@outlook.com',
    password: 'bankas',
  };
  let adminToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });
  it('Attempting to delete a non existing bank account should return a 404 message', (done) => {
    chai.request(app)
      .delete('/api/v1/accounts/201900')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Deleting a bank accout should return a message about the action', (done) => {
    chai.request(app)
      .delete('/api/v1/accounts/2019002')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.message), 'Bank Account 2019002 Successfully Deleted');
        done();
      });
  });

  it('Accesing a deleted bank account should return a 404 message', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/2019002')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });
});
