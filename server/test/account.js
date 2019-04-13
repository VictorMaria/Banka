/* eslint-disable no-undef */
/* eslint-disable quotes */
import chai from 'chai';
import app from '../../app';

chai.use(require('chai-http'));

const assert = chai.assert();

// Tests for creating a new bank account
describe('Creating a bank acocunt', () => {
  const emptyOwnerField = {
    owner: '',
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const missingOwnerField = {
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const emptyFirstNameField = {
    owner: 1,
    firstName: '',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const missingFirstNameField = {
    owner: 1,
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const emptyLastNameField = {
    owner: 1,
    firstName: 'Victor',
    lastName: '',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const missingLastNameField = {
    owner: 1,
    firstName: 'Victor',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const emptyEmailField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: '',
    type: 'savings',
    openingBalance: '200.00',
  };

  const missingEmailField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    type: 'savings',
    openingBalance: '200.00',
  };

  const invalidEmail = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomioutlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };

  const emptyTypeField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: '',
    openingBalance: '200.00',
  };

  const missingTypeField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    openingBalance: '200.00',
  };

  const invalidType = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'dollar',
    openingBalance: '200.00',
  };

  const emptyOpeningBalanceField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '',
  };

  const missingOpeningBalanceField = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
  };

  const invalidOpeningBalance = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.0',
  };
  const completeDetails = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'savings',
    openingBalance: '200.00',
  };
  const completeDetailsTwo = {
    owner: 1,
    firstName: 'Victor',
    lastName: 'Ajayi',
    email: 'victor.abayomi@outlook.com',
    type: 'current',
    openingBalance: '10000.00',
  };

  it('Should return an error stating owner must be a number', (done) => {
    chai.request(app)
      .post('/api/v1/accounts')
      .send(emptyOwnerField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"owner" must be a number`);
        done();
      });
  });

  it('Should return an error stating owner field is required', (done) => {
    api.post('/api/v1/accounts')
      .send(missingOwnerField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"owner" is required`);
        done();
      });
  });

  it('Should return an error for empty firstName field', (done) => {
    api.post('/api/v1/accounts')
      .send(emptyFirstNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"firstName" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating firstName field is required', (done) => {
    api.post('/api/v1/accounts')
      .send(missingFirstNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"firstName" is required`);
        done();
      });
  });

  it('Should return an error for empty lastName field', (done) => {
    api.post('/api/v1/accounts')
      .send(emptyLastNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"lastName" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating lastName field is required', (done) => {
    api.post('/api/v1/accounts')
      .send(missingLastNameField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"lastName" is required`);
        done();
      });
  });

  it('Should return an error for empty email field', (done) => {
    api.post('/api/v1/accounts')
      .send(emptyEmailField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating email field is required', (done) => {
    api.post('/api/v1/accounts')
      .send(missingEmailField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" is required`);
        done();
      });
  });

  it('Should return an error for an invalid email', (done) => {
    api.post('/api/v1/accounts')
      .send(invalidEmail)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"email" must be a valid email`);
        done();
      });
  });

  it('Should return an error for empty type field', (done) => {
    api.post('/api/v1/accounts')
      .send(emptyTypeField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"type" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating type field is required', (done) => {
    api.post('/api/v1/accounts')
      .send(missingTypeField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"type" is required`);
        done();
      });
  });

  it('Should return an error for invalid account type', (done) => {
    api.post('/api/v1/accounts')
      .send(invalidType)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"type" with value "dollar" fails to match the required pattern: /^savings$|^current$/`);
        done();
      });
  });

  it('Should return an error for empty openingBalance field', (done) => {
    api.post('/api/v1/accounts')
      .send(emptyOpeningBalanceField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"openingBalance" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating openingBalance field is required', (done) => {
    api.post('/api/v1/accounts')
      .send(missingOpeningBalanceField)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"openingBalance" is required`);
        done();
      });
  });
  it('Should return an error for invalid openingBalance entry', (done) => {
    api.post('/api/v1/accounts')
      .send(invalidOpeningBalance)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"openingBalance" with value "200.0" fails to match the required pattern: /^[0-9]+\\.[0-9]{2}$/`);
        done();
      });
  });
  it('Should return an object with key-value pairs upon sending complete and correct details', (done) => {
    api.post('/api/v1/accounts')
      .send(completeDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'status');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'lastName');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'type');
        assert.property((res.body.data), 'openingBalance');
        assert.property((res.body.data), 'balance');
        done();
      });
  });
  it('Should return an object with key-value pairs upon sending another set of complete and correct details', (done) => {
    api.post('/api/v1/accounts')
      .send(completeDetailsTwo)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.property((res.body), 'status');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'lastName');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'type');
        assert.property((res.body.data), 'openingBalance');
        assert.property((res.body.data), 'balance');
        done();
      });
  });
});

// Test for fetching a specific bank account

describe('Fetching a specific bank account', () => {
  it('Should return an error for a non existent bank account', (done) => {
    api.get('/api/v1/accounts/20190022')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Should return an object with key-value pairs for an existing bank account', (done) => {
    api.get('/api/v1/accounts/2019001')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.property((res.body), 'status');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'firstName');
        assert.property((res.body.data), 'lastName');
        assert.property((res.body.data), 'email');
        assert.property((res.body.data), 'type');
        assert.property((res.body.data), 'openingBalance');
        assert.property((res.body.data), 'balance');
        done();
      });
  });
});

// Tests for activating or deactivating a bank account

describe('Activating or deactivating a bank account', () => {
  it('Attempting to activate or deactivate a non existent account should return a 404 error', (done) => {
    api.patch('/api/v1/accounts/20190022')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Activating a bank account should return an object with key-value pairs', (done) => {
    api.patch('/api/v1/accounts/2019001')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.status), 'active');
        done();
      });
  });

  it('Deactivating a bank account should return an object with key-value pairs', (done) => {
    api.patch('/api/v1/accounts/2019001')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.status), 'dormant');
        done();
      });
  });
});

// Tests for checking account balance of a specific bank account
describe('Checking bank account balance', () => {
  it('Attempting to check the balance of a non existent account should return a 404 error', (done) => {
    api.get('/api/v1/accounts/20190022/balance')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Checking balance for an exisiting bank account should return correct balance in an object', (done) => {
    api.get('/api/v1/accounts/2019001/balance')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.accountBalance), '200.00');
        done();
      });
  });
});

// Tests for credit transactions

const emptyCashier = {
  cashier: '',
  amount: '100.00',
  remark: 'Monthly Interest',
};

const missingCashier = {
  amount: '100.00',
  remark: 'Monthly Interest',
};

const wrongCashier = {
  cashier: 'w',
  amount: '100.00',
  remark: 'Monthly Interest',
};

const wrongAmountPattern = {
  cashier: 1,
  amount: '100.000',
  remark: 'Monthly Interest',
};

const missingAmount = {
  cashier: 1,
  remark: 'Monthly Interest',
};

const emptyRemark = {
  cashier: 1,
  amount: '100.00',
  remark: '',
};

const missingRemark = {
  cashier: 1,
  amount: '100.00',
};

const lengthyRemark = {
  cashier: 1,
  amount: '100.00',
  remark: 'This is a lengthy remark for a transaction',
};

const completeCreditDetails = {
  cashier: 1,
  amount: '1000.00',
  remark: 'Monthly Interest',
};

describe('Credit transcactions', () => {
  it('Should return an error for empty cashier field', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(emptyCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"cashier" must be a number`);
        done();
      });
  });

  it('Should return an error for missing cashier field', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(missingCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"cashier" is required`);
        done();
      });
  });

  it('Should return an error for wrong cashier input type', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(wrongCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"cashier" must be a number`);
        done();
      });
  });

  it('Should return an error for wrong  amount format', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(wrongAmountPattern)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"amount" with value "100.000" fails to match the required pattern: /^[0-9]+\\.[0-9]{2}$/`);
        done();
      });
  });

  it('Should return an error stating amount field is required', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(missingAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"amount" is required`);
        done();
      });
  });


  it('Should return an error for empty remark field', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(emptyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"remark" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating remark field is required', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(missingRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"remark" is required`);
        done();
      });
  });

  it('Should return an error for a remark of more than 25 characters', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(lengthyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"remark" length must be less than or equal to 25 characters long`);
        done();
      });
  });

  it('Attempting to credit a non existent account should return a 404 error', (done) => {
    api.post('/api/v1/transactions/20190012/credit')
      .send(completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Attempting to credit an existing account should return correct account balance and key-pair values in an object', (done) => {
    api.post('/api/v1/transactions/2019001/credit')
      .send(completeCreditDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.transactionType), 'Credit');
        assert.equal((res.body.data.amount), '1000.00');
        assert.equal((res.body.data.accountBalance), '1200.00');
        assert.property((res.body.data), 'transactionId');
        assert.property((res.body.data), 'transactionDate');
        assert.property((res.body.data), 'amount');
        assert.property((res.body.data), 'cashier');
        assert.property((res.body.data), 'remark');
        done();
      });
  });
});

// Tests for debit transaction
const completeDebitDetails = {
  cashier: 1,
  amount: '50.00',
  remark: 'Monthly Due',
};
const excessDebitDetails = {
  cashier: 1,
  amount: '5000.00',
  remark: 'Party',
};

describe('Debit transcactions', () => {
  it('Should return an error for empty cashier field', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(emptyCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"cashier" must be a number`);
        done();
      });
  });

  it('Should return an error stating cashier field is required', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(missingCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"cashier" is required`);
        done();
      });
  });

  it('Should return an error for wrong cashier input type', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(wrongCashier)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"cashier" must be a number`);
        done();
      });
  });

  it('Should return an error for wrong  amount format', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(wrongAmountPattern)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"amount" with value "100.000" fails to match the required pattern: /^[0-9]+\\.[0-9]{2}$/`);
        done();
      });
  });

  it('Should return an error stating amount field is required', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(missingAmount)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"amount" is required`);
        done();
      });
  });

  it('Should return an error for empty remark field', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(emptyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"remark" is not allowed to be empty`);
        done();
      });
  });

  it('Should return an error stating remark field is required', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(missingRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"remark" is required`);
        done();
      });
  });

  it('Should return an error for a remark of more than 25 characters', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(lengthyRemark)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), `"remark" length must be less than or equal to 25 characters long`);
        done();
      });
  });

  it('Attempting to debit a non existent account should return a 404 error', (done) => {
    api.post('/api/v1/transactions/20190012/debit')
      .send(completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Attempting to debit an amount greater than the account balance should return an error', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(excessDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 400);
        assert.equal((res.body.error), 'Insufficient Funds');
        done();
      });
  });
  it('Attempting to debit an existing account should return correct account balance and key-pair values in an object', (done) => {
    api.post('/api/v1/transactions/2019001/debit')
      .send(completeDebitDetails)
      .end((err, res) => {
        assert.equal((res.body.status), 201);
        assert.equal((res.body.data.accountNumber), '2019001');
        assert.equal((res.body.data.transactionType), 'Debit');
        assert.equal((res.body.data.amount), '50.00');
        assert.equal((res.body.data.accountBalance), '1150.00');
        assert.property((res.body.data), 'transactionId');
        assert.property((res.body.data), 'transactionDate');
        assert.property((res.body.data), 'amount');
        assert.property((res.body.data), 'cashier');
        assert.property((res.body.data), 'remark');
        done();
      });
  });
});

// Tests for deleting a specific bank account
describe('Deleting a bank account', () => {
  it('Attempting to delete a non existing bank account should return a 404 message', (done) => {
    api.delete('/api/v1/accounts/201900')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });

  it('Deleting a bank accout should return a message about the action', (done) => {
    api.delete('/api/v1/accounts/2019002')
      .end((err, res) => {
        assert.equal((res.body.status), 200);
        assert.equal((res.body.message), 'Bank Account 2019002 Successfully Deleted');
        done();
      });
  });

  it('Accesing a deleted bank account should return a 404 message', (done) => {
    api.get('/api/v1/accounts/2019002')
      .end((err, res) => {
        assert.equal((res.body.status), 404);
        assert.equal((res.body.error), 'Bank Account not found');
        done();
      });
  });
});
