import transactionQueries from '../models/transaction';
import accountQueries from '../models/account';
import db from '../db/index';


class Transaction {
  static async creditAccount(req, res) {
    try {
      const findBalance = await db.query(transactionQueries.findBalanceQuery,
        [req.params.accountNumber]);
      const valuesForCredit = [
        req.params.accountNumber,
        new Date(),
        req.body.amount,
        req.user.id,
        'Credit',
        req.body.remark,
        parseFloat(req.body.amount) + parseFloat(findBalance.rows[0].balance),
      ];
      const { rows } = await db.query(transactionQueries.creditTransactionQuery, valuesForCredit);
      const response = {
        status: 200,
        data: {
          transactionId: rows[0].transaction_id,
          accountNumber: req.params.accountNumber,
          transactionDate: rows[0].transaction_date,
          transactionType: rows[0].transaction_type,
          cashier: rows[0].cashier,
          amount: rows[0].amount,
          remark: rows[0].remark,
          accountBalance: rows[0].account_balance,
        },
      };
      const values = [
        parseFloat(req.body.amount),
        req.params.accountNumber,
      ];

      // eslint-disable-next-line no-unused-vars
      const updateBalance = await db.query(transactionQueries.creditBalanceQuery, values);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send({ status: 500, mesaage: error });
    }
  }

  static async debitAccount(req, res) {
    try {
      const findBalance = await db.query(transactionQueries.findBalanceQuery,
        [req.params.accountNumber]);
      if (findBalance.rows[0].balance < parseFloat(req.body.amount)) {
        return res.status(400).send({ status: 400, error: 'Insufficient Funds' });
      }
      const valuesForDebit = [
        req.params.accountNumber,
        new Date(),
        req.body.amount,
        req.user.id,
        'Debit',
        req.body.remark,
        parseFloat(findBalance.rows[0].balance) - parseFloat(req.body.amount),
      ];
      const { rows } = await db.query(transactionQueries.debitTransactionQuery, valuesForDebit);
      const response = {
        status: 200,
        data: {
          transactionId: rows[0].transaction_id,
          accountNumber: req.params.accountNumber,
          transactionDate: rows[0].transaction_date,
          transactionType: rows[0].transaction_type,
          cashier: rows[0].cashier,
          amount: rows[0].amount,
          remark: rows[0].remark,
          accountBalance: rows[0].account_balance,
        },
      };
      const values = [
        parseFloat(req.body.amount),
        req.params.accountNumber,
      ];
      // eslint-disable-next-line no-unused-vars
      const updateBalance = await db.query(transactionQueries.debitBalanceQuery, values);
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send({ status: 500, mesaage: error });
    }
  }

  static async getAllTransactions(req, res) {
    try {
      const { rows } = await db.query(transactionQueries.allTransactions);
      if (!rows[0]) {
        return res.status(404).send({ status: 200, error: 'No transactions here' });
      }
      return res.status(200).send({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getTransaction(req, res) {
    try {
      const transaction = await db.query(transactionQueries.getTransaction,
        [req.params.transactionId]);
      if (!transaction.rows[0]) {
        return res.status(404).send({ status: 404, error: 'Transaction not found' });
      }
      const accountNumber = transaction.rows[0].account_number;
      const retreiveAccount = await db.query(accountQueries.getBankAccountQuery,
        [accountNumber]);

      if (req.user.id !== retreiveAccount.rows[0].user_id
          && !req.user.is_admin && !req.user.is_staff) {
        return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });
      }
      return res.status(200).send({
        status: 200,
        data: {
          transactionId: transaction.rows[0].transaction_id,
          transactionDate: transaction.rows[0].transaction_date,
          transactionType: transaction.rows[0].transaction_type,
          accountNumber: transaction.rows[0].account_number,
          amount: transaction.rows[0].amount,
          accountBalance: transaction.rows[0].account_balance,
        },
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
export default Transaction;
