'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(require('chai-http'));

// Test for sign up
/* eslint-disable quotes */
/* eslint-disable no-undef */
var missingEmail = {
  firstName: 'VICTOR',
  lastname: 'AJAYI',
  password: 'bankas'
};

var missingFirstName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  lastName: 'AJAYI',
  password: 'bankas'
};

var missingLastName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  password: 'bankas'
};

var missingPassword = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI'
};

var emptyEmail = {
  email: '',
  firstName: 'VICTOR',
  lastname: 'AJAYI',
  password: 'bankas'
};

var invalidEmail = {
  email: 'VICTOR.ABAYOMIoutlook.com',
  firstName: 'VICTOR',
  lastname: 'AJAYI',
  password: 'bankas'
};

var emptyFirstName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: '',
  lastName: 'AJAYI',
  password: 'bankas'
};

var emptyLastName = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: '',
  password: 'bankas'
};

var emptyPassword = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
  password: ''
};

var wrongPasswordLength = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
  password: 'banka'
};

var completeSignUpDetails = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  firstName: 'VICTOR',
  lastName: 'AJAYI',
  password: 'bankas'
};

describe('Signing up', function () {
  it('Should return an error for missing email field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(missingEmail).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" is required');
      done();
    });
  });
  it('Should return an error for missing firstName field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(missingFirstName).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"firstName" is required');
      done();
    });
  });
  it('Should return an error for missing lastName field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(missingLastName).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"lastName" is required');
      done();
    });
  });
  it('Should return an error for missing password field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(missingPassword).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"password" is required');
      done();
    });
  });
  it('Should return an error for empty email field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(emptyEmail).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" is not allowed to be empty');
      done();
    });
  });
  it('Should return an error for an invalid email', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(invalidEmail).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" must be a valid email');
      done();
    });
  });
  it('Should return an error for empty firstName field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(emptyFirstName).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"firstName" is not allowed to be empty');
      done();
    });
  });
  it('Should return an error for empty lastName field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(emptyLastName).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"lastName" is not allowed to be empty');
      done();
    });
  });
  it('Should return an error for empty passsword field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(emptyPassword).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"password" is not allowed to be empty');
      done();
    });
  });
  it('Should return an error for a short or weak password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(wrongPasswordLength).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"password" length must be at least 6 characters long');
      done();
    });
  });
  it('A successful sign up should return an object of key-pair values', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(completeSignUpDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 201);
      _chai.assert.property(res.body.data, 'token');
      _chai.assert.equal(res.body.data.id, 1);
      _chai.assert.equal(res.body.data.firstName, 'Victor');
      _chai.assert.equal(res.body.data.lastName, 'Ajayi');
      _chai.assert.equal(res.body.data.email, 'victor.abayomi@outlook.com');
      _chai.assert.equal(res.body.data.type, 'client');
      done();
    });
  });
  it('Atempting to sign up again with the same email should return an error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(completeSignUpDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, 'Email already in use');
      done();
    });
  });
});

// Test for sign in
var missingEmailSignIn = {
  password: 'bankas'
};
var missingPasswordSignIn = {
  email: 'VICTOR.ABAYOMI@outlook.com'
};

var emptyEmailSignIn = {
  email: '',
  password: 'bankas'
};
var emptyPasswordSignIn = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  password: ''
};

var invalidEmailSignIn = {
  email: 'VICTOR.ABAYOMIoutlook.com',
  password: 'bankas'
};

var nonExistingUser = {
  email: 'Victor@outlook.com',
  password: 'bankas'
};

var wrongPasswordSignIn = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  password: 'banka'
};

var correctSignInDetails = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  password: 'bankas'
};

describe('Signing in', function () {
  it('Should return an error for missing email field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(missingEmailSignIn).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" is required');
      done();
    });
  });
  it('Should return an error for missing password field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(missingPasswordSignIn).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"password" is required');
      done();
    });
  });
  it('Should return an error for empty email field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(emptyEmailSignIn).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" is not allowed to be empty');
      done();
    });
  });
  it('Should return an error for empty password field', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(emptyPasswordSignIn).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"password" is not allowed to be empty');
      done();
    });
  });
  it('Should return an error for an invalid email', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(invalidEmailSignIn).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, '"email" must be a valid email');
      done();
    });
  });

  it('Should return an error for a non existing user', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(nonExistingUser).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, 'Incorrect Email');
      done();
    });
  });
  it('Should return an error for a wrong password', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(wrongPasswordSignIn).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, 'Incorrect Password');
      done();
    });
  });
  it('A successful sign in should return an object of key-pair values', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(correctSignInDetails).end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.property(res.body.data, 'token');
      _chai.assert.equal(res.body.data.id, 1);
      _chai.assert.equal(res.body.data.firstName, 'Victor');
      _chai.assert.equal(res.body.data.lastName, 'Ajayi');
      _chai.assert.equal(res.body.data.email, 'victor.abayomi@outlook.com');
      _chai.assert.equal(res.body.data.type, 'client');
      done();
    });
  });
});

// Tests for fetching a specific user
describe('Fetching a specific user', function () {
  it('Fetching a specific and non existing user should return an error', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/users/12').end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'User not found');
      done();
    });
  });
  it('Fetching a speciific and existing user should return an object of key-pair values', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/users/1').end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.equal(res.body.data.id, 1);
      _chai.assert.equal(res.body.data.firstName, 'Victor');
      _chai.assert.equal(res.body.data.lastName, 'Ajayi');
      _chai.assert.equal(res.body.data.email, 'victor.abayomi@outlook.com');
      _chai.assert.equal(res.body.data.type, 'client');
      done();
    });
  });
});
var photoLocation = _path2.default.join(__dirname, './henrydanger.jpg');
var fileLocation = _path2.default.join(__dirname, './Harmattan nights.pdf');

describe('Uploading profile photo', function () {
  it('A non user attempting to upload a profile photo should throw an error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/12/profilephotos').attach('profilePhoto', photoLocation).end(function (err, res) {
      _chai.assert.equal(res.body.status, 404);
      _chai.assert.equal(res.body.error, 'User not found');
      done();
    });
  });

  it('Uploading nothing should throw an error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/1/profilephotos').attach('profilePhoto', '').end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, 'Select an Image');
      done();
    });
  });

  it('Uploading a file asides an image should throw an error', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/1/profilephotos').attach('profilePhoto', fileLocation).end(function (err, res) {
      _chai.assert.equal(res.body.status, 400);
      _chai.assert.equal(res.body.error, 'Select an Image');
      done();
    });
  });

  it('A successful upload should return an object of key-pair values', function (done) {
    _chai2.default.request(_app2.default).post('/api/v1/users/1/profilephotos').attach('profilePhoto', photoLocation).end(function (err, res) {
      _chai.assert.equal(res.body.status, 200);
      _chai.assert.equal(res.body.data.id, 1);
      _chai.assert.equal(res.body.data.email, 'victor.abayomi@outlook.com');
      _chai.assert.include(res.body.data.profilePhoto, 'henrydanger');
      done();
    });
  });
});