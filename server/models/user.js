const userQueries = {
  newUserQuery: `INSERT INTO 
    users(first_name, last_name, email, password, type, profile_photo)
    values($1, $2, $3, $4, $5, $6)
    returning *`,
};

export default userQueries;
