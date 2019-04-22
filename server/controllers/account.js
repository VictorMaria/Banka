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
      parseFloat(req.body.openingBalance),
      parseFloat(req.body.openingBalance) + 0.00,
    ];
    try {
      const { rows } = await db.query(accountQueries.createBankAccountQuery, values);
      const response = {
        status: 201,
        data: {
          accountNumber: rows[0].account_number,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
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

  static async getBankAccount(req, res) {
    try {
      const { rows } = await db.query(accountQueries.getBankAccountQuery,
        [req.params.accountNumber]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'Bank Account not found' });
      }
      const response = {
        status: 200,
        data: {
          accountNumber: rows[0].account_number,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email.toLowerCase(),
          type: rows[0].type,
          openingBalance: rows[0].opening_balance.toFixed(2),
          balance: rows[0].balance.toFixed(2),
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      res.status(400).send({ status: 400, mesaage: error });
    }
    return true;
  }

  static async activateDeactivate(req, res) {
    try {
      const { rows } = await db.query(accountQueries.checkStatus, [req.params.accountNumber]);
      if (rows[0].status === 'draft' || rows[0].status === 'dormant') {
        const values = [
          'active',
          req.params.accountNumber,
        ];
        const activate = await db.query(accountQueries.activateQuery, values);
        return res.status(200).send({
          status: 200,
          data: {
            accountNumber: activate.rows[0].account_number,
            status: activate.rows[0].status,
          },
        });
      }
      const values = [
        'dormant',
        req.params.accountNumber,
      ];
      const deactivate = await db.query(accountQueries.deactivateQuery, values);
      return res.status(200).send({
        status: 200,
        data: {
          accountNumber: deactivate.rows[0].account_number,
          status: deactivate.rows[0].status,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
export default Account;
