const bankAccountData = {
  emptyOwnerField: {
    owner: '',
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingOwnerField: {
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyFirstNameField: {
    owner: 1,
    firstName: '',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingFirstNameField: {
    owner: 1,
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyLastNameField: {
    owner: 1,
    firstName: 'Victor',
    lastName: '',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingLastNameField: {
    owner: 1,
    firstName: 'Victor',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyEmailField: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: '',
    type: 'savings',
    openingBalance: '200.00',
  },

  missingEmailField: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    type: 'savings',
    openingBalance: '200.00',
  },

  invalidEmail: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomioutlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },

  emptyTypeField: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: '',
    openingBalance: '200.00',
  },

  missingTypeField: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    openingBalance: '200.00',
  },

  invalidType: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'dollar',
    openingBalance: '200.00',
  },

  emptyOpeningBalanceField: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '',
  },

  missingOpeningBalanceField: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
  },
  invalidOpeningBalance: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.0',
  },
  completeDetails: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  },
  completeDetailsTwo: {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'current',
    openingBalance: '10000.00',
  },
};
export default bankAccountData;
