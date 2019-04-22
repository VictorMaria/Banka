/* eslint-disable no-undef */
import chai, { assert } from 'chai';
import path from 'path';
import app from '../../app';
import userData from './userData';


chai.use(require('chai-http'));

// Test for sign up
describe('Signing up', () => {
  it('Should return an error for missing email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.missingEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for missing firstName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.missingFirstName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for missing lastName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.missingLastName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for missing password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.missingPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.emptyEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.invalidEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for empty firstName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.emptyFirstName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for empty lastName field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.emptyLastName)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for empty passsword field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.emptyPassword)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for a short or weak password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.wrongPasswordLength)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('A successful sign up should return an object of key-pair values', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userData.completeSignUpDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data), 'token');
        assert.equal((res.body.data.id), 4);
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
      .send(userData.completeSignUpDetails)
      .end((err, res) => {
        // assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Email already in use');
        done();
      });
  });
});

// Test for sign in
xdescribe('Signing in', () => {
  it('Should return an error for missing email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.missingEmailSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for missing password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.missingPasswordSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for empty email field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.emptyEmailSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for empty password field', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.emptyPasswordSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });
  it('Should return an error for an invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.invalidEmailSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.property((res.body), 'error');
        done();
      });
  });

  it('Should return an error for a non existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.nonExistingUser)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Incorrect Email');
        done();
      });
  });
  it('Should return an error for a wrong password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.wrongPasswordSignIn)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Incorrect Password');
        done();
      });
  });
  it('A successful sign in should return an object of key-pair values', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userData.correctSignInDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body.data), 'token');
        assert.equal((res.body.data.id), 3);
        assert.equal((res.body.data.firstName), 'Victor');
        assert.equal((res.body.data.lastName), 'Ajayi');
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.equal((res.body.data.type), 'client');
        done();
      });
  });
});

// Tests for fetching a specific user
xdescribe('Fetching a specific user', () => {
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
      .get('/api/v1/users/3')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.id), 3);
        assert.equal((res.body.data.firstName), 'Victor');
        assert.equal((res.body.data.lastName), 'Ajayi');
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.equal((res.body.data.type), 'client');
        done();
      });
  });
});
const photoLocation = path.join(__dirname, './testItems/henrydanger.jpg');
const fileLocation = path.join(__dirname, './testItems/Harmattan nights.pdf');

xdescribe('Uploading profile photo', () => {
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
      .post('/api/v1/users/3/profilephotos')
      .attach('profilePhoto', '')
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Select an Image');
        done();
      });
  });

  it('Uploading a file asides an image should throw an error', (done) => {
    chai.request(app)
      .post('/api/v1/users/3/profilephotos')
      .attach('profilePhoto', fileLocation)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Select an Image');
        done();
      });
  });

  it('A successful upload should return an object of key-pair values', (done) => {
    chai.request(app)
      .post('/api/v1/users/3/profilephotos')
      .attach('profilePhoto', photoLocation)
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.id), 3);
        assert.equal((res.body.data.email), 'victor.abayomi@outlook.com');
        assert.include((res.body.data.profilePhoto), 'henrydanger');
        done();
      });
  });
});
