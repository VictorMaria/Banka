const accountQueries = {
  createBankAccountQuery: `INSERT INTO
        accounts(user_id, account_number, first_name, last_name, email, created_on, type, status, opening_balance, balance)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        returning *`,
  getBankAccountQuery: `SELECT account_number, first_name, last_name, email, type, status, opening_balance, balance
        FROM accounts WHERE account_number = $1`,
};
export default accountQueries;
