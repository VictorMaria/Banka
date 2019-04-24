import transactionQueries from '../models/transaction';
import db from '../db/index';

class Transaction {
  static async creditAccount(req, res) {
    try {
      const findBalance = await db.query(transactionQueries.findBalanceQuery,
        [req.params.accountNumber]);
      const values = [
        parseFloat(req.body.amount),
        req.params.accountNumber,
      ];
      const updateBalance = await db.query(transactionQueries.creditBalanceQuery, values);
      const valuesForCredit = [
        req.params.accountNumber,
        new Date(),
        req.body.amount,
        req.body.cashier,
        'Credit',
        req.body.remark,
        updateBalance.rows[0].balance,
      ];
      const { rows } = await db.query(transactionQueries.creditTransactionQuery, valuesForCredit);
      const response = {
        status: 200,
        data: {
          transactionId: rows[0].id,
          accountNumber: req.params.accountNumber,
          transactionDate: rows[0].transaction_date,
          transactionType: rows[0].transaction_type,
          cashier: rows[0].cashier,
          amount: rows[0].amount,
          remark: rows[0].remark,
          accountBalance: rows[0].account_balance,
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send({ status: 400, mesaage: error });
    }
  }

  static async debitAccount(req, res) {
    try {
      const findBalance = await db.query(transactionQueries.findBalanceQuery,
        [req.params.accountNumber]);
      if (findBalance.rows[0].balance < parseFloat(req.body.amount)) {
        return res.status(400).send({ status: 400, error: 'Insufficient Funds' });
      }
      const values = [
        parseFloat(req.body.amount),
        req.params.accountNumber,
      ];
      const updateBalance = await db.query(transactionQueries.debitBalanceQuery, values);
      const valuesForCredit = [
        req.params.accountNumber,
        new Date(),
        req.body.amount,
        req.body.cashier,
        'Debit',
        req.body.remark,
        updateBalance.rows[0].balance,
      ];
      const { rows } = await db.query(transactionQueries.debitTransactionQuery, valuesForCredit);
      const response = {
        status: 200,
        data: {
          transactionId: rows[0].id,
          accountNumber: req.params.accountNumber,
          transactionDate: rows[0].transaction_date,
          transactionType: rows[0].transaction_type,
          cashier: rows[0].cashier,
          amount: rows[0].amount,
          remark: rows[0].remark,
          accountBalance: rows[0].account_balance,
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send({ status: 400, mesaage: error });
    }
  }
}
export default Transaction;
