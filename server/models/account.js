const accountQueries = {
  createBankAccountQuery: `INSERT INTO
        accounts(user_id, account_number, first_name, last_name, email, created_on, type, status, opening_balance, balance)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *`,
  getBankAccountQuery: `SELECT account_number, first_name, last_name, email, type, status, opening_balance, balance
        FROM accounts WHERE account_number = $1`,
  checkStatus: 'SELECT status FROM accounts WHERE account_number = $1',
  activateQuery: 'UPDATE accounts SET status = $1 WHERE account_number = $2 returning account_number, status',
  deactivateQuery: 'UPDATE accounts SET status = $1 WHERE account_number = $2 returning account_number, status',
  getAllBankAccountsQuery: 'SELECT * FROM accounts',
};
export default accountQueries;
