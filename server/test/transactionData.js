
const transactionData = {
  emptyCashier: {
    cashier: '',
    amount: '100.00',
    remark: 'Monthly Interest',
  },

  missingCashier: {
    amount: '100.00',
    remark: 'Monthly Interest',
  },


  wrongCashier: {
    cashier: 'w',
    amount: '100.00',
    remark: 'Monthly Interest',
  },

  wrongAmountPattern: {
    cashier: 1,
    amount: '100.000',
    remark: 'Monthly Interest',
  },

  missingAmount: {
    cashier: 1,
    remark: 'Monthly Interest',
  },

  emptyRemark: {
    cashier: 1,
    amount: '100.00',
    remark: '',
  },

  missingRemark: {
    cashier: 1,
    amount: '100.00',
  },

  lengthyRemark: {
    cashier: 1,
    amount: '100.00',
    remark: 'This is a lengthy remark for a transaction',
  },

  completeCreditDetails: {
    cashier: 1,
    amount: '1000.00',
    remark: 'Monthly Interest',
  },
  completeDebitDetails: {
    cashier: 1,
    amount: '50.00',
    remark: 'Monthly Due',
  },
  excessDebitDetails: {
    cashier: 1,
    amount: '5000.00',
    remark: 'Party',
  },
  user: {
    email: 'sophie.kamali@outlook.com',
    password: 'bankas',
  },
  admin: {
    email: 'john.kamali@outlook.com',
    password: 'bankas',
  },
  staff: {
    email: 'fatima@outlook.com',
    password: 'bankas',
  },
  invalidToken: {
    badToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU0OTEzMzg0MCwiZXhwIjoxNTQ5NzM4NjQwfQ.Nbn6fNkuk4wR9Jx_C1-wiUZnBLZybmBZtUqCfMSR0dQ',
  },
};

export default transactionData;
