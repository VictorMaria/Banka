/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import app from '../../app';
import bankAccountData from './bankAccountData';
import userData from './userData';

chai.use(require('chai-http'));

// Tests for creating a new bank account
describe('Creating a bank acocunt', () => {
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
  it('Creating a bank accout without a token should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  it('Should return an error for empty type field', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.emptyTypeField)
      .set('x-access-token', userToken)
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
      .set('x-access-token', userToken)
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
      .set('x-access-token', userToken)
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
      .set('x-access-token', userToken)
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
      .set('x-access-token', userToken)
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
      .set('x-access-token', userToken)
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
  let requestedAccountNumber;
  before((done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .set('x-access-token', villainToken)
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

describe('Activating or deactivating a bank account', () => {
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
  let requestedAccountNumber;
  before((done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .set('x-access-token', villainToken)
      .end((err, res) => {
        requestedAccountNumber = res.body.data.accountNumber;
        done();
      });
  });
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 403);
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
  it('A regular user attempting to activate a bank account should return an error', (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });
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
  it('An admin attempting to deactivate a bank account should an object', (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data), 'accountNumber');
        assert.equal((res.body.data.status), 'dormant');
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

  it('Staff attempting to Activate a bank account should return an object with key-value pairs', (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data), 'accountNumber');
        assert.equal((res.body.data.status), 'active');
        done();
      });
  });

  it('Staff attempting to deactivate a bank account should return an object with key-value pairs', (done) => {
    chai.request(app)
      .patch(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data), 'accountNumber');
        assert.equal((res.body.data.status), 'dormant');
        done();
      });
  });
});

// Tests for getting all bank accounts
describe('Fetching all bank accounts', () => {
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
  it('A regular user attempting to view all bank accounts should throw an error', (done) => {
    chai.request(app)
      .get('/api/v1/accounts')
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });

  it('Attempting to get all bank accounts without a token should throw an error', (done) => {
    chai.request(app)
      .get('/api/v1/accounts')
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 403);
        assert.equal((res.body.error), 'Token is not provided');
        done();
      });
  });
  it('A staff attempting to view all accounts should get an array of objects', (done) => {
    chai.request(app)
      .get('/api/v1/accounts')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data[0]), 'account_number');
        assert.property((res.body.data[1]), 'account_number');
        assert.property((res.body.data[2]), 'account_number');
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


// Tests for deleting a specific bank account
describe('Deleting a bank account', () => {
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
  let requestedAccountNumber;
  before((done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(bankAccountData.completeDetails)
      .set('x-access-token', villainToken)
      .end((err, res) => {
        requestedAccountNumber = res.body.data.accountNumber;
        done();
      });
  });
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .delete(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', '')
      .end((err, res) => {
        assert.equal((res.body.status), 403);
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
  it('A non admin attempting to delete an existing bank account should return a 403 error', (done) => {
    chai.request(app)
      .delete(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'Unauthourised!');
        done();
      });
  });
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
      .delete(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.message), `Bank Account ${requestedAccountNumber} Successfully Deleted`);
        done();
      });
  });

  it('Accesing a deleted bank account should return a 404 message', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });
});
