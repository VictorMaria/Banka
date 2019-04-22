
const userData = {
  missingEmail: {
    firstName: 'Victor',
    lastname: 'Ajayi',
    password: 'bankas',
  },

  missingFirstName: {
    email: 'victor.abayomi@outlook.com',
    lastName: 'Ajayi',
    password: 'bankas',
  },

  missingLastName: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    password: 'bankas',
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
    password: 'bankas',
  },
  invalidEmail: {
    email: 'VICTOR.ABAYOMIoutlook.com',
    firstName: 'Victor',
    lastname: 'Ajayi',
    password: 'bankas',
  },
  emptyFirstName: {
    email: 'victor.abayomi@outlook.com',
    firstName: '',
    lastName: 'Ajayi',
    password: 'bankas',
  },
  emptyLastName: {
    email: 'victor.abayomi@outlook.com',
    firstName: 'Victor',
    lastName: '',
    password: 'bankas',
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
    password: 'bankas',
  },
  missingEmailSignIn: {
    password: 'bankas',
  },
  missingPasswordSignIn: {
    email: 'victor.abayomi@outlook.com',
  },

  emptyEmailSignIn: {
    email: '',
    password: 'bankas',
  },
  emptyPasswordSignIn: {
    email: 'victor.abayomi@outlook.com',
    password: '',
  },

  invalidEmailSignIn: {
    email: 'VICTOR.ABAYOMIoutlook.com',
    password: 'bankas',
  },

  nonExistingUser: {
    email: 'Victor@outlook.com',
    password: 'bankas',
  },

  wrongPasswordSignIn: {
    email: 'victor.abayomi@outlook.com',
    password: 'banka',
  },

  correctSignInDetails: {
    email: 'victor.abayomi@outlook.com',
    password: 'bankas',
  },

};
export default userData;
