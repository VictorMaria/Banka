import accountQueries from '../models/account';
import db from '../db/index';
import generateAccountNumber from '../helpers/generateAccountNumber';
import refine from '../helpers/refine';

class Account {
  static async createBankAccount(req, res) {
    const accountStatus = 'active';
    const accountNumber = generateAccountNumber();
    if (!req.body.openingBalance) {
      req.body.openingBalance = 0.00;
    }
    try {
      const getUser = await db.query(accountQueries.getUserByIdQuery, [req.user.id]);
      const values = [
        req.user.id,
        accountNumber,
        getUser.rows[0].first_name,
        getUser.rows[0].last_name,
        getUser.rows[0].email,
        new Date(),
        refine(req.body.type),
        accountStatus,
        parseFloat(req.body.openingBalance),
        parseFloat(req.body.openingBalance) + 0.00,
      ];
      const { rows } = await db.query(accountQueries.createBankAccountQuery, values);
      const response = {
        status: 201,
        data: {
          userId: rows[0].user_id,
          accountNumber: rows[0].account_number,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email.toLowerCase(),
          type: rows[0].type,
          openingBalance: rows[0].opening_balance,
          balance: rows[0].balance,
        },
      };
      res.status(201).send(response);
    } catch (error) {
      res.status(500).send({ status: 500, mesaage: error });
    }
  }

  static async getBankAccount(req, res) {
    try {
      const { rows } = await db.query(accountQueries.getBankAccountQuery,
        [req.params.accountNumber]);
      const accountOwner = rows[0].user_id;
      if (req.user.id !== accountOwner && !req.user.is_staff && !req.user.is_admin) {
        return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });
      }
      const response = {
        status: 200,
        data: {
          accountNumber: rows[0].account_number,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email.toLowerCase(),
          type: rows[0].type,
          openingBalance: rows[0].opening_balance,
          balance: rows[0].balance,
          status: rows[0].status,
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ status: 500, mesaage: error });
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
            message: 'Account activated',
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
          message: 'Account deactivated',
        },
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getAllBankAccounts(req, res) {
    const { status } = req.query;
    try {
      if (status === undefined) {
        const { rows } = await db.query(accountQueries.getAllBankAccountsQuery);
        res.status(200).send({ status: 200, data: rows });
      } else if (status === 'active') {
        const activeAccounts = await db.query(accountQueries.getActiveBankAccountsQuery, [status]);
        res.status(200).send({ status: 200, data: activeAccounts.rows });
      } else if (status === 'dormant') {
        const dormantAccounts = await db.query(accountQueries.getDormantBackAccountsQuery,
          [status]);
        res.status(200).send({ status: 200, data: dormantAccounts.rows });
      } else {
        res.status(400).send({ status: 400, error: 'Bad request' });
      }
      return true;
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getAllBankAccountsForOneUser(req, res) {
    try {
      const { rows } = await db.query(accountQueries.getAllBankAccountsForOneUserQuery,
        [req.params.email]);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, error: 'This User has no bank account' });
      }
      return res.status(200).send({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async deleteBankAccount(req, res) {
    try {
      // eslint-disable-next-line no-unused-vars
      const deleteAccount = await db.query(accountQueries.deleteBankAccountQuery,
        [req.params.accountNumber]);
      return res.status(200).send({
        status: 200,
        message: `Bank Account ${req.params.accountNumber} Successfully Deleted`,
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
export default Account;
