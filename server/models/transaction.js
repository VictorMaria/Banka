const transactionQueries = {
  findBalanceQuery: 'SELECT balance FROM accounts WHERE account_number = $1',
  updateBalanceQuery: `UPDATE accounts SET balance = balance + $1 WHERE account_number = $2
    returning balance`,
  creditTransactionQuery: `INSERT INTO
    transactions(account_number, transaction_date, amount, cashier, transaction_type, remark, account_balance)
    values($1, $2, $3, $4, $5, $6, $7)
    returning *`,

};
export default transactionQueries;
