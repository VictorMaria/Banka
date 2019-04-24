const bankAccountData = {
  emptyTypeField: {
    type: '',
    openingBalance: '200.00',
  },

  missingTypeField: {
    openingBalance: '200.00',
  },

  invalidType: {
    type: 'dollar',
    openingBalance: '200.00',
  },
  invalidOpeningBalance: {
    type: 'savings',
    openingBalance: '200.0',
  },
  completeDetails: {
    type: 'savings',
    openingBalance: '200.00',
  },
  completeDetailsTwo: {
    type: 'current',
    openingBalance: '10000.00',
  },
};
export default bankAccountData;
