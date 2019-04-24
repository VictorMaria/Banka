/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import app from '../../app';
import bankAccountData from './bankAccountData';
import transactionData from './transactionData';
import userData from './userData';

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
describe('Credit transcactions', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
      .send(transactionData.completeCreditDetails)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
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
  it('A non staff attempting to credit an account should return a 403 error', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
      .set('x-access-token', userToken)
      .send(transactionData.completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Unauthourised!');
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
  it('Should return an error for empty cashier field', (done) => {
    chai.request(app)
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
      .post(`/api/v1/transactions/${requestedAccountNumber}/credit`)
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
  