const createQueries = {
  userTable: `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        is_staff BOOLEAN NOT NULL DEFAULT false,
        profile_photo VARCHAR(255)
    )`,
  accountTable: `CREATE TABLE IF NOT EXISTS
    accounts(
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      account_number INTEGER DEFAULT 2019000,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL, 
      email VARCHAR(100) NOT NULL,
      created_on TIMESTAMP,
      type VARCHAR(15) NOT NULL,
      status VARCHAR(15) NOT NULL,
      opening_balance FLOAT,
      balance FLOAT,
      FOREIGN KEY (user_id) REFERENCES users (id)
      )`,
  transactionTable: `CREATE TABLE IF NOT EXISTS
    transactions(
      id SERIAL PRIMARY KEY,
      account_number INTEGER NOT NULL,
      transaction_date TIMESTAMP,
      amount FLOAT NOT NULL,
      cashier INTEGER NOT NULL,
      transaction_type VARCHAR(7) NOT NULL,
      remark VARCHAR(25) NOT NULL,
      account_balance FLOAT
      )`,
};

const dropQueries = {
  userTable: 'DROP TABLE IF EXISTS users CASCADE',
  accountTable: 'DROP TABLE IF EXISTS accounts CASCADE',
  transactionTable: 'DROP TABLE IF EXISTS transactions CASCADE',
};

module.exports = {
  createQueries,
  dropQueries,
};
