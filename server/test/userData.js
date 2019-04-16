
const userData = {
  missingEmail: {
    firstName: 'VICTOR',
    lastname: 'AJAYI',
    password: 'bankas',
  },

  missingFirstName: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    lastName: 'AJAYI',
    password: 'bankas',
  },

  missingLastName: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: 'VICTOR',
    password: 'bankas',
  },
  missingPassword: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: 'VICTOR',
    lastName: 'AJAYI',
  },
  emptyEmail: {
    email: '',
    firstName: 'VICTOR',
    lastname: 'AJAYI',
    password: 'bankas',
  },
  invalidEmail: {
    email: 'VICTOR.ABAYOMIoutlook.com',
    firstName: 'VICTOR',
    lastname: 'AJAYI',
    password: 'bankas',
  },
  emptyFirstName: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: '',
    lastName: 'AJAYI',
    password: 'bankas',
  },
  emptyLastName: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: 'VICTOR',
    lastName: '',
    password: 'bankas',
  },
  emptyPassword: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: 'VICTOR',
    lastName: 'AJAYI',
    password: '',
  },

  wrongPasswordLength: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: 'VICTOR',
    lastName: 'AJAYI',
    password: 'banka',
  },

  completeSignUpDetails: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    firstName: 'VICTOR',
    lastName: 'AJAYI',
    password: 'bankas',
  },
  missingEmailSignIn: {
    password: 'bankas',
  },
  missingPasswordSignIn: {
    email: 'VICTOR.ABAYOMI@outlook.com',
  },

  emptyEmailSignIn: {
    email: '',
    password: 'bankas',
  },
  emptyPasswordSignIn: {
    email: 'VICTOR.ABAYOMI@outlook.com',
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
    email: 'VICTOR.ABAYOMI@outlook.com',
    password: 'banka',
  },

  correctSignInDetails: {
    email: 'VICTOR.ABAYOMI@outlook.com',
    password: 'bankas',
  },

};
export default userData;
