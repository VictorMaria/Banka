/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import chai, { assert } from 'chai';
import app from '../../app';
import bankAccountData from './bankAccountData';
import transactionData from './transactionData';
import userData from './userData';

// User token requested for new bank account
let userToken;
before((done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(userData.user)
    .end((err, res) => {
      userToken = res.body.data.token;
      done();
    });
});
let requestedAccountNumber;
before((done) => {
  chai.request(app)
    .post('/api/v1/accounts')
    .send(bankAccountData.completeDetails)
    .set('x-access-token', userToken)
    .end((err, res) => {
      requestedAccountNumber = res.body.data.accountNumber;
      done();
    });
});
describe('Credit transcactions', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
      .send(transactionData.completeCreditDetails)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  it('A non staff attempting to credit an account should return a 403 error', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
      .set('x-access-token', userToken)
      .send(transactionData.completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'You are not authorized to perform this action');
        done();
      });
  });
  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });
  it('Should return an error stating amount field is required', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
      .set('x-access-token', staffToken)
      .send(transactionData.missingAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for a remark of more than 25 characters', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post('/api/v1/transactions/2019000/credit')
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
      .set('x-access-token', staffToken)
      .send(transactionData.completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), `${requestedAccountNumber}`);
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
describe('Debit transcactions', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
      .send(transactionData.completeDebitDetails)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  it('A non staff attempting to debit an account should return a 403 error', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
      .set('x-access-token', userToken)
      .send(transactionData.completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'You are not authorized to perform this action');
        done();
      });
  });

  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });

  it('Should return an error stating amount field is required', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
      .set('x-access-token', staffToken)
      .send(transactionData.emptyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for a remark of more than 25 characters', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/debit`)
      .set('x-access-token', staffToken)
      .send(transactionData.completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), `${requestedAccountNumber}`);
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

describe('User access to own bank account transaction', () => {
  let villainToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.villain)
      .end((err, res) => {
        villainToken = res.body.data.token;
        done();
      });
  });
  let requestedVillainAccountNumber;
  before((done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .set('x-access-token', villainToken)
      .end((err, res) => {
        requestedVillainAccountNumber = res.body.data.accountNumber;
        done();
      });
  });

  it('A user attempting to access another user bank account history should throw an error', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedVillainAccountNumber}/transactions`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'You are not authorized to perform this action');
        done();
      });
  });
  it('A user attempting to access own bank account history should return success with an object', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}/transactions`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data[0]), 'transaction_type');
        assert.property((res.body.data[0]), 'amount');
        assert.property((res.body.data[1]), 'transaction_type');
        assert.property((res.body.data[1]), 'amount');
        done();
      });
  });
  let requestedSecondAccountNumber;
  before((done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .set('x-access-token', userToken)
      .end((err, res) => {
        requestedSecondAccountNumber = res.body.data.accountNumber;
        done();
      });
  });
  it('A user attempting to access own bank account without history should throw an error', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedSecondAccountNumber}/transactions`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.error), 'No transactions here');
        done();
      });
  });
  it('A user attempting to access bank account history with a wrong account number should throw an error', (done) => {
    chai.request(app)
      .get('/api/v1/accounts/2019000/transactions')
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });
});

// An admin or staff can view transactions of any bank account
describe('User access to own bank account transaction', () => {
  let adminToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.admin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done();
      });
  });
  let staffToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.staff)
      .end((err, res) => {
        staffToken = res.body.data.token;
        done();
      });
  });
  it('A staff attempting to access a bank account history should return success with an object', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}/transactions`)
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data[0]), 'transaction_type');
        assert.property((res.body.data[0]), 'amount');
        assert.property((res.body.data[1]), 'transaction_type');
        assert.property((res.body.data[1]), 'amount');
        done();
      });
  });
  it('An admin attempting to access a bank account history should return success with an object', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}/transactions`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data[0]), 'transaction_type');
        assert.property((res.body.data[0]), 'amount');
        assert.property((res.body.data[1]), 'transaction_type');
        assert.property((res.body.data[1]), 'amount');
        done();
      });
  });
});
