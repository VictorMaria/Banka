/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import app from '../../app';
import bankAccountData from './bankAccountData';
import userData from './userData';

chai.use(require('chai-http'));

// Tests for creating a new bank account
describe('Creating a bank account', () => {
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
  it('Should return an error for a non existing bank account', (done) => {
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
  it('Owner checking own account should return an object with key-value pairs for an existing bank account', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', villainToken)
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
  it('A user attempting to access another user account should throw an error', (done) => {
    chai.request(app)
      .get(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'You are not authorized to perform this action');
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
        assert.equal((res.body.error), 'You are not authorized to perform this action');
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
  it('Attempting to activate or deactivate a non existing account should return a 404 error', (done) => {
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
        assert.equal((res.body.error), 'You are not authorized to perform this action');
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

describe('Checking active and dormant accounts', () => {
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
  it('A staff attempting to view all active accounts should get a list of all active accounts', (done) => {
    chai.request(app)
      .get('/api/v1/accounts?status=active')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data[0].status), 'active');
        assert.equal((res.body.data[1].status), 'active');
        assert.equal((res.body.data[2].status), 'active');
        done();
      });
  });
  it('A staff attempting to view all dormant accounts should get a list of all dormant accounts', (done) => {
    chai.request(app)
      .get('/api/v1/accounts?status=dormant')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data[0].status), 'dormant');
        done();
      });
  });
  it('A wrong query string should return an error', (done) => {
    chai.request(app)
      .get('/api/v1/accounts?status=dormat')
      .set('x-access-token', staffToken)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Bad request');
        done();
      });
  });
});

// Test for viewing all bank accounts owned by one user
describe('Fetching bank accounts owned by one user', () => {
  it('Attempts without a token should throw an error', (done) => {
    chai.request(app)
      .get('/api/v1/user/sophie.kamali@outlook.com/accounts')
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
  it('A non admin or staff attempting to view all bank accounts owned by a user should throw an error', (done) => {
    chai.request(app)
      .get('/api/v1/user/sophie.kamali@outlook.com/accounts')
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'You are not authorized to perform this action');
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
  it('Attempts for a user with no bank account should throw a 200', (done) => {
    chai.request(app)
      .get('/api/v1/user/sophi.kamali@outlook.com/accounts')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.error), 'This User has no bank account');
        done();
      });
  });
  it('Attempts for a user with one or more bank accounts should return an array of objects', (done) => {
    chai.request(app)
      .get('/api/v1/user/sophie.kamali@outlook.com/accounts')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data[0]), 'account_number');
        assert.property((res.body.data[1]), 'account_number');
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
  it('A non admin or staff attempting to delete an existing bank account should return error', (done) => {
    chai.request(app)
      .delete(`/api/v1/accounts/${requestedAccountNumber}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        assert.equal((res.body.status), 401);
        assert.equal((res.body.error), 'You are not authorized to perform this action');
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
