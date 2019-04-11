/* eslint-disable consistent-return */
class Account {
  constructor() {
    this.bankAccounts = [];
    this.transactions = [];
    this.accountUniqueId = 0;
    this.accountNumberUniqueId = 0;
    this.transactionUniqueId = 0;
  }

  createBankAccount(data) {
    this.accountUniqueId += 1;
    this.accountNumberUniqueId += 1;
    const bankAccount = {
      id: this.bankAccounts.length + this.accountUniqueId,
      accountNumber: `${2019000 + this.accountNumberUniqueId}`,
      owner: data.owner,
      firstName: (data.firstName[0]).toUpperCase() + (data.firstName).slice(1).toLowerCase(),
      lastName: (data.lastName[0]).toUpperCase() + (data.lastName).slice(1).toLowerCase(),
      email: (data.email).toLowerCase(),
      createdOn: new Date().toString(),
      type: data.type,
      status: 'draft',
      openingBalance: parseFloat(data.openingBalance),
      balance: parseFloat(data.openingBalance),
    };

    this.bankAccounts.push(bankAccount);
    const response = {
      owner: bankAccount.owner,
      accountNumber: bankAccount.accountNumber,
      firstName: bankAccount.firstName,
      lastName: bankAccount.lastName,
      email: bankAccount.email,
      type: bankAccount.type,
      openingBalance: bankAccount.openingBalance.toFixed(2),
      balance: bankAccount.balance.toFixed(2),
    };
    return response;
  }

  findBankAccount(accountNumber) {
    const bankAccount = this.bankAccounts.find(b => b.accountNumber === accountNumber);
    if (bankAccount) {
      return {
        accountNumber: bankAccount.accountNumber,
        firstName: bankAccount.firstName,
        lastName: bankAccount.lastName,
        email: bankAccount.email,
        type: bankAccount.type,
        openingBalance: bankAccount.openingBalance,
        balance: bankAccount.balance.toFixed(2),
      };
    }
  }

  activateDeactivate(accountNumber) {
    const bankAccount = this.bankAccounts.find(b => b.accountNumber === accountNumber);
    if (bankAccount.status === 'dormant' || bankAccount.status === 'draft') {
      bankAccount.status = 'active';
    } else {
      bankAccount.status = 'dormant';
    }
    return {
      accountNumber: bankAccount.accountNumber,
      status: bankAccount.status,
    };
  }

  checkBalance(accountNumber) {
    const bankAccount = this.bankAccounts.find(b => b.accountNumber === accountNumber);
    return {
      accountNumber: bankAccount.accountNumber,
      firstName: bankAccount.firstName,
      lastName: bankAccount.lastName,
      type: bankAccount.type,
      accountBalance: bankAccount.balance.toFixed(2),
    }
  }
}

export default new Account();
