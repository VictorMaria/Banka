
const transactionData = {
  wrongAmountPattern: {
    amount: 100,
    remark: 'Monthly Interest',
  },

  missingAmount: {
    remark: 'Monthly Interest',
  },

  emptyRemark: {
    amount: 100,
    remark: '',
  },

  missingRemark: {
    amount: 100,
  },

  lengthyRemark: {
    amount: 100,
    remark: 'This is a lengthy remark for a transaction',
  },

  completeCreditDetails: {
    amount: 1000,
    remark: 'Monthly Interest',
  },
  completeDebitDetails: {
    amount: 50,
    remark: 'Monthly Due',
  },
  excessDebitDetails: {
    amount: 5000,
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
