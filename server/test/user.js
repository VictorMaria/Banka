/* eslint-disable quotes */
/* eslint-disable no-undef */
import { assert } from 'chai';
import supertest from 'supertest';

const api = supertest('http://localhost:3000');

// Test for sign up
const missingEmail = {
  firstName: 'VICTOR',
  lastname: 'AJAYI',
  password: 'bankas',
};

const missingFirstName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  lastName: 'AJAYI',
  password: 'bankas',
};

const missingLastName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  password: 'bankas',
};

const missingPassword = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
};

const emptyEmail = {
  email: '',
  firstName: 'VICTOR',
  lastname: 'AJAYI',
  password: 'bankas',
};

const invalidEmail = {
  email: 'VICTOR.ABAYOMIoutlook.com',
  firstName: 'VICTOR',
  lastname: 'AJAYI',
  password: 'bankas',
};

const emptyFirstName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: '',
  lastName: 'AJAYI',
  password: 'bankas',
};

const emptyLastName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: '',
  password: 'bankas',
};

const emptyPassword = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
  password: '',
};

const wrongPasswordLength = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
  password: 'banka',
};

const completeSignUpDetails = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
  password: 'bankas',
};

describe('Signing up', () => {
  it('Should return an error for missing email field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(missingEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is required`);
        done();
      });
  });
  it('Should return an error for missing firstName field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(missingFirstName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"firstName" is required`);
        done();
      });
  });
  it('Should return an error for missing lastName field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(missingLastName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"lastName" is required`);
        done();
      });
  });
  it('Should return an error for missing password field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(missingPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" is required`);
        done();
      });
  });
  it('Should return an error for empty email field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(emptyEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for an invalid email', (done) => {
    api.post('/api/v1/auth/signup')
      .send(invalidEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" must be a valid email`);
        done();
      });
  });
  it('Should return an error for empty firstName field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(emptyFirstName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"firstName" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for empty lastName field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(emptyLastName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"lastName" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for empty passsword field', (done) => {
    api.post('/api/v1/auth/signup')
      .send(emptyPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for a short or weak password', (done) => {
    api.post('/api/v1/auth/signup')
      .send(wrongPasswordLength)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" length must be at least 6 characters long`);
        done();
      });
  });
  it('A successful sign up should return an object of key-pair values', (done) => {
    api.post('/api/v1/auth/signup')
      .send(completeSignUpDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body.data), 'token');
        assert.equal((res.body.data.id), 1);
        assert.equal((res.body.data.firstName), 'Victor');
        assert.equal((res.body.data.lastName), 'Ajayi');
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.equal((res.body.data.type), 'client');
        done();
      });
  });
  it('Atempting to sign up again with the same email should return an error', (done) => {
    api.post('/api/v1/auth/signup')
      .send(completeSignUpDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Email already in use');
        done();
      });
  });
});
