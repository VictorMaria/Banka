import dotenv from 'dotenv';

dotenv.config();
const enterPassword = process.env.onepassword;

const userData = {
  missingEmail: {
    firstName: 'Victor',
    lastname: 'Ajayi',
    password: enterPassword,
  },

  missingFirstName: {
    email: 'victor.abayomi@outlook.com',
    lastName: 'Ajayi',
    password: enterPassword,
  },

  missingLastName: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    password: enterPassword,
  },
  missingPassword: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    lastName: 'Ajayi',
  },
  emptyEmail: {
    email: '',
    firstName: 'Victor',
    lastname: 'Ajayi',
    password: enterPassword,
  },
  invalidEmail: {
    email: 'VICTOR.ABAYOMIoutlook.com',
    firstName: 'Victor',
    lastname: 'Ajayi',
    password: enterPassword,
  },
  emptyFirstName: {
    email: 'victor.abayomi@outlook.com',
    firstName: '',
    lastName: 'Ajayi',
    password: enterPassword,
  },
  emptyLastName: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    lastName: '',
    password: enterPassword,
  },
  emptyPassword: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    lastName: 'Ajayi',
    password: '',
  },

  wrongPasswordLength: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    lastName: 'Ajayi',
    password: 'banka',
  },

  completeSignUpDetails: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    lastName: 'Ajayi',
    password: enterPassword,
  },
  missingEmailSignIn: {
    password: enterPassword,
  },
  missingPasswordSignIn: {
    email: 'victor.abayomi@outlook.com',
  },

  emptyEmailSignIn: {
    email: '',
    password: enterPassword,
  },
  emptyPasswordSignIn: {
    email: 'victor.abayomi@outlook.com',
    password: '',
  },

  invalidEmailSignIn: {
    email: 'VICTOR.ABAYOMIoutlook.com',
    password: enterPassword,
  },

  nonExistingUser: {
    email: 'Victor@outlook.com',
    password: enterPassword,
  },

  wrongPasswordSignIn: {
    email: 'victor.abayomi@outlook.com',
    password: 'banka',
  },

  correctSignInDetails: {
    email: 'victor.abayomi@outlook.com',
    password: enterPassword,
  },

  user: {
    email: 'sophie.kamali@outlook.com',
    password: enterPassword,
  },

  staff: {
    email: 'fatima.kamali@outlook.com',
    password: enterPassword,
  },

  admin: {
    email: 'john.kamali@outlook.com',
    password: enterPassword,
  },

  villain: {
    email: 'christopher.hassan@outlook.com',
    password: enterPassword,
  },

};
export default userData;
