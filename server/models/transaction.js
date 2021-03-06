const transactionQueries = {
  findBalanceQuery: 'SELECT * FROM accounts WHERE account_number = $1',
  creditBalanceQuery: `UPDATE accounts SET balance = balance + $1 WHERE account_number = $2
    returning balance`,
  creditTransactionQuery: `INSERT INTO
    transactions(account_number, transaction_date, amount, cashier, transaction_type, remark, account_balance)
    values($1, $2, $3, $4, $5, $6, $7)
    returning *`,
  debitBalanceQuery: `UPDATE accounts SET balance = balance - $1 WHERE account_number = $2
    returning balance`,
  debitTransactionQuery: `INSERT INTO
    transactions(account_number, transaction_date, amount, cashier, transaction_type, remark, account_balance)
    values($1, $2, $3, $4, $5, $6, $7)
    returning *`,
  allTransactions: 'SELECT * FROM transactions ORDER BY transaction_id DESC',
  getTransaction: 'SELECT * FROM transactions WHERE transaction_id = $1',

};
export default transactionQueries;
