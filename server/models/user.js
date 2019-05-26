const userQueries = {
  newUserQuery: `INSERT INTO 
    users(first_name, last_name, email, password, type, profile_photo)
    values($1, $2, $3, $4, $5, $6)
    returning *`,
  signInQuery: 'SELECT * FROM users WHERE email = $1',
  checkEmailQuery: 'SELECT * FROM users WHERE email = $1',
  myTransactionHistoryQuery: 'SELECT * FROM transactions WHERE account_number = $1 ORDER BY transaction_id DESC',
  checkUser: 'SELECT user_id FROM accounts WHERE account_number = $1',
  checkUserByEmail: 'SELECT id FROM users WHERE email = $1',
  myAccountQuery: 'SELECT * FROM accounts WHERE account_number = $1',
  getUserQuery: 'SELECT * FROM users WHERE id = $1',
  uploadPhotoQuery: 'UPDATE users SET profile_photo = $1 WHERE id = $2 returning id, email, profile_photo',
};

export default userQueries;
