const createQueries = {
  userTable: `CREATE TABLE IF NOT EXISTS
    users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(35) NOT NULL,
        last_name VARCHAR(35) NOT NULL,
        email VARCHAR(45) NOT NULL,
        password VARCHAR(255) NOT NULL,
        type VARCHAR(10) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false,
        is_staff BOOLEAN NOT NULL DEFAULT false,
        profile_photo VARCHAR(255)
    )`,
  accountTable: `CREATE TABLE IF NOT EXISTS
    accounts(
      id SERIAL,
      user_id INTEGER,
      account_number BIGINT,
      first_name VARCHAR(35) NOT NULL,
      last_name VARCHAR(35) NOT NULL, 
      email VARCHAR(45) NOT NULL,
      created_on TIMESTAMP,
      type VARCHAR(10) NOT NULL,
      status VARCHAR(10) NOT NULL,
      opening_balance NUMERIC(15, 2) DEFAULT 0.00,
      balance NUMERIC(15, 2) DEFAULT 0.00,
      FOREIGN KEY (user_id) REFERENCES users (id)
      )`,
  transactionTable: `CREATE TABLE IF NOT EXISTS
    transactions(
      transaction_id SERIAL PRIMARY KEY,
      account_number BIGINT NOT NULL,
      transaction_date TIMESTAMP,
      amount NUMERIC(15, 2) NOT NULL,
      cashier INTEGER NOT NULL,
      transaction_type VARCHAR(10) NOT NULL,
      remark VARCHAR(25) NOT NULL DEFAULT 'No remark',
      account_balance NUMERIC(15, 2)
      )`,
};

const dropQueries = {
  userTable: 'DROP TABLE IF EXISTS users CASCADE',
  accountTable: 'DROP TABLE IF EXISTS accounts CASCADE',
  transactionTable: 'DROP TABLE IF EXISTS transactions CASCADE',
};

const hashedPassword = '$2b$08$vI3HX/EeLrATeRPf8/TPAuN2nVDb4ZZH.TXIjPH9oqjKRnGIfKY.G';
const seedQueries = {
  userTable: `INSERT INTO
  users(first_name, last_name, email, password, type, profile_photo, is_admin, is_staff)
    VALUES('John', 'Kamali', 'john.kamali@outlook.com', '${hashedPassword}', 'admin', 'ninja-avi.jpg', true, false),
          ('Fatima', 'Kamali', 'fatima.kamali@outlook.com', '${hashedPassword}', 'staff', 'ninja-avi.jpg', false, true),
          ('Sophie', 'Kamali', 'sophie.kamali@outlook.com', '${hashedPassword}', 'client', 'ninja-avi.jpg', false, false),
          ('Christopher', 'Hassan', 'christopher.hassan@outlook.com', '${hashedPassword}', 'client', 'ninja-avi.jpg', false, false)
          `,
};

module.exports = {
  createQueries,
  dropQueries,
  seedQueries,
};
