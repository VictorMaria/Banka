import db from './index';
import { createQueries, dropQueries } from './queries';

const createTables = async () => {
  try {
    const user = await db.query(createQueries.userTable);
    console.log(user);
    const account = await db.query(createQueries.accountTable);
    console.log(account);
    const transaction = await db.query(createQueries.transactionTable);
    console.log(transaction);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    const user = await db.query(dropQueries.userTable);
    console.log(user);
    const account = await db.query(dropQueries.accountTable);
    console.log(account);
    const transaction = await db.query(dropQueries.transactionTable);
    console.log(transaction);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTables,
  dropTables,
};
require('make-runnable');
