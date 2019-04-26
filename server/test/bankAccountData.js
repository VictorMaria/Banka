const bankAccountData = {
  emptyTypeField: {
    type: '',
    openingBalance: 200,
  },

  missingTypeField: {
    openingBalance: 200,
  },

  invalidType: {
    type: 'dollar',
    openingBalance: 200,
  },
  invalidOpeningBalance: {
    type: 'savings',
    openingBalance: '5 hundred',
  },
  completeDetails: {
    type: 'savings',
    openingBalance: 200,
  },
  completeDetailsTwo: {
    type: 'current',
    openingBalance: 10000,
  },
};
export default bankAccountData;
