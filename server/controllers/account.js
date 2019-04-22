import accountQueries from '../models/account';
import db from '../db/index';
import generateAccountNumber from '../helpers/generateAccountNumber';

class Account {
  static async createBankAccount(req, res) {
    const accountStatus = 'draft';
    const accountNumber = generateAccountNumber();
    const values = [
      req.body.userID,
      accountNumber,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      new Date(),
      req.body.type,
      accountStatus,
      req.body.openingBalance,
    ];
    try {
      const { rows } = await db.query(accountQueries.createBankAccountQuery, values);
      const response = {
        status: 201,
        data: {
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          accountNumber: rows[0].account_number,
          email: rows[0].email.toLowerCase(),
          type: rows[0].type,
          openingBalance: rows[0].opening_balance.toFixed(2),
          balance: rows[0].balance.toFixed(2),
        },
      };
      return res.status(201).send(response);
    } catch (error) {
      res.status(400).send({ status: 400, mesaage: error });
    }
    return true;
  }
}
export default Account;
