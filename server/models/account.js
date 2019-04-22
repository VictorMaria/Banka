const accountQueries = {
  createBankAccountQuery: `INSERT INTO
        accounts(user_id, account_number, first_name, last_name, email, created_on, type, status, opening_balance)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`,
};
export default accountQueries;
