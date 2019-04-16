import bankAccounts from '../storage/bankAccounts';

let accountUniqueId = 0;
let accountNumberUniqueId = 0;

class Account {
  static createBankAccount(data) {
    accountUniqueId += 1;
    accountNumberUniqueId += 1;
    const bankAccount = {
      id: bankAccounts.length + accountUniqueId,
      accountNumber: `${2019000 + accountNumberUniqueId}`,
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

    bankAccounts.push(bankAccount);
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
}
export default Account;
