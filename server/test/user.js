/* eslint-disable quotes */
/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import path from 'path';
import app from '../../app';

chai.use(require('chai-http'));

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
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(missingEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is required`);
        done();
      });
  });
  it('Should return an error for missing firstName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(missingFirstName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"firstName" is required`);
        done();
      });
  });
  it('Should return an error for missing lastName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(missingLastName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"lastName" is required`);
        done();
      });
  });
  it('Should return an error for missing password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(missingPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" is required`);
        done();
      });
  });
  it('Should return an error for empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(invalidEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" must be a valid email`);
        done();
      });
  });
  it('Should return an error for empty firstName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyFirstName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"firstName" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for empty lastName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyLastName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"lastName" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for empty passsword field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(emptyPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for a short or weak password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(wrongPasswordLength)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" length must be at least 6 characters long`);
        done();
      });
  });
  it('A successful sign up should return an object of key-pair values', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
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
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(completeSignUpDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Email already in use');
        done();
      });
  });
});

// Test for sign in
const missingEmailSignIn = {
  password: 'bankas',
};
const missingPasswordSignIn = {
  email: 'VICTOR.ABAYOMI@outlook.com',
};

const emptyEmailSignIn = {
  email: '',
  password: 'bankas',
};
const emptyPasswordSignIn = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  password: '',
};

const invalidEmailSignIn = {
  email: 'VICTOR.ABAYOMIoutlook.com',
  password: 'bankas',
};

const nonExistingUser = {
  email: 'Victor@outlook.com',
  password: 'bankas',
};

const wrongPasswordSignIn = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  password: 'banka',
};

const correctSignInDetails = {
  email: 'VICTOR.ABAYOMI@outlook.com',
  password: 'bankas',
};

describe('Signing in', () => {
  it('Should return an error for missing email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(missingEmailSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is required`);
        done();
      });
  });
  it('Should return an error for missing password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(missingPasswordSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" is required`);
        done();
      });
  });
  it('Should return an error for empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(emptyEmailSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(emptyPasswordSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"password" is not allowed to be empty`);
        done();
      });
  });
  it('Should return an error for an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(invalidEmailSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" must be a valid email`);
        done();
      });
  });

  it('Should return an error for a non existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(nonExistingUser)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Incorrect Email');
        done();
      });
  });
  it('Should return an error for a wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(wrongPasswordSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Incorrect Password');
        done();
      });
  });
  it('A successful sign in should return an object of key-pair values', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(correctSignInDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data), 'token');
        assert.equal((res.body.data.id), 1);
        assert.equal((res.body.data.firstName), 'Victor');
        assert.equal((res.body.data.lastName), 'Ajayi');
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.equal((res.body.data.type), 'client');
        done();
      });
  });
});

// Tests for fetching a specific user
describe('Fetching a specific user', () => {
  it('Fetching a specific and non existing user should return an error', (done) => {
    chai.request(app)
      .get('/api/v1/users/12')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'User not found');
        done();
      });
  });
  it('Fetching a speciific and existing user should return an object of key-pair values', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.id), 1);
        assert.equal((res.body.data.firstName), 'Victor');
        assert.equal((res.body.data.lastName), 'Ajayi');
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.equal((res.body.data.type), 'client');
        done();
      });
  });
});
const photoLocation = path.join(__dirname, './henrydanger.jpg');
const fileLocation = path.join(__dirname, './Harmattan nights.pdf');

describe('Uploading profile photo', () => {
  it('A non user attempting to upload a profile photo should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/users/12/profilephotos')
      .attach('profilePhoto', photoLocation)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'User not found');
        done();
      });
  });

  it('Uploading nothing should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/profilephotos')
      .attach('profilePhoto', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Select an Image');
        done();
      });
  });

  it('Uploading a file asides an image should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/profilephotos')
      .attach('profilePhoto', fileLocation)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Select an Image');
        done();
      });
  });

  it('A successful upload should return an object of key-pair values', (done) => {
    chai.request(app)
      .post('/api/v1/users/1/profilephotos')
      .attach('profilePhoto', photoLocation)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.id), 1);
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.include((res.body.data.profilePhoto), 'henrydanger');
        done();
      });
  });
});
