import bankAccounts from '../storage/bankAccounts';
import transactions from '../storage/transactions';
import { sendEmailNotification } from '../helpers/postals';

let accountUniqueId = 0;
let accountNumberUniqueId = 0;
let transactionUniqueId = 0;

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

  // eslint-disable-next-line consistent-return
  static findBankAccount(accountNumber) {
    const bankAccount = bankAccounts.find(b => b.accountNumber === accountNumber);
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

  static activateDeactivate(accountNumber) {
    const bankAccount = bankAccounts.find(b => b.accountNumber === accountNumber);
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

  static creditAccount(accountNumber, data) {
    const bankAccount = bankAccounts.find(b => b.accountNumber === accountNumber);
    transactionUniqueId += 1;
    bankAccount.balance += parseFloat(data.amount);
    bankAccount.balance = bankAccount.balance.toFixed(2);
    const refinedBalance = bankAccount.balance;
    bankAccount.balance = parseFloat(bankAccount.balance);

    const transaction = {
      transactionId: transactionUniqueId,
      accountNumber: bankAccount.accountNumber,
      transactionDate: new Date().toString(),
      amount: parseFloat(data.amount).toFixed(2),
      cashier: data.cashier,
      transactionType: 'Credit',
      remark: data.remark,
      accountBalance: refinedBalance,
    };
    transactions.push(transaction);
    const emailSubject = `${transaction.transactionType} Alert`;
    // eslint-disable-next-line max-len
    sendEmailNotification(bankAccount.email, emailSubject, transaction.transactionType, transaction.transactionDate, transaction.amount, transaction.remark, transaction.accountBalance);
    return transaction;
  }

  static debitAccount(accountNumber, data) {
    const bankAccount = bankAccounts.find(b => b.accountNumber === accountNumber);
    if (data.amount > bankAccount.balance) {
      return 'Insufficient Funds';
    }
    transactionUniqueId += 1;
    bankAccount.balance -= parseFloat(data.amount);
    bankAccount.balance = bankAccount.balance.toFixed(2);
    const refinedBalance = bankAccount.balance;
    bankAccount.balance = parseFloat(bankAccount.balance);

    const transaction = {
      transactionId: transactionUniqueId,
      accountNumber: bankAccount.accountNumber,
      transactionDate: new Date().toString(),
      amount: parseFloat(data.amount).toFixed(2),
      cashier: data.cashier,
      transactionType: 'Debit',
      remark: data.remark,
      accountBalance: refinedBalance,
    };
    transactions.push(transaction);
    const emailSubject = `${transaction.transactionType} Alert`;
    sendEmailNotification(bankAccount.email, emailSubject, transaction.transactionType, transaction.transactionDate, transaction.amount, transaction.remark, transaction.accountBalance);
    return transaction;
  }

  static deleteBankAccount(accountNumber) {
    const bankAccount = bankAccounts.find(b => b.accountNumber === accountNumber);
    const index = bankAccounts.indexOf(bankAccount);
    bankAccounts.splice(index, 1);
    const message = `Bank Account ${accountNumber} Successfully Deleted`;
    return message;
  }
}
export default Account;
