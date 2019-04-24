/* eslint-disable consistent-return */
import db from '../db/index';
import accountQueries from '../models/account';

const checkBankAccount = async (req, res, next) => {
  try {
    const { rows } = await db.query(accountQueries.checkBankAccountQuery,
      [req.params.accountNumber]);
    if (!rows[0]) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    return next();
  } catch (error) {
    res.status(500).send(error);
  }
};
export default checkBankAccount;
