const userQueries = {
  newUserQuery: `INSERT INTO 
    users(first_name, last_name, email, password, type, profile_photo)
    values($1, $2, $3, $4, $5, $6)
    returning *`,
  signInQuery: 'SELECT * FROM users WHERE email = $1',
  checkEmailQuery: 'SELECT * FROM users WHERE email = $1',
};

export default userQueries;
