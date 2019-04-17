const bankAccountData = {
  emptyUserIDField: {
    userID: '',
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingUserIDField: {
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyFirstNameField: {
    userID: 1,
    firstName: '',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingFirstNameField: {
    userID: 1,
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyLastNameField: {
    userID: 1,
    firstName: 'Victor',
    lastName: '',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingLastNameField: {
    userID: 1,
    firstName: 'Victor',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyEmailField: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: '',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingEmailField: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    type: 'savings',
    openingBalance: '200.00',
  },

  invalidEmail: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomioutlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyTypeField: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: '',
    openingBalance: '200.00',
  },

  missingTypeField: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    openingBalance: '200.00',
  },

  invalidType: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'dollar',
    openingBalance: '200.00',
  },

  emptyOpeningBalanceField: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '',
  },

  missingOpeningBalanceField: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
  },
  invalidOpeningBalance: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.0',
  },
  completeDetails: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },
  completeDetailsTwo: {
    userID: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'current',
    openingBalance: '10000.00',
  },
};
export default bankAccountData;
