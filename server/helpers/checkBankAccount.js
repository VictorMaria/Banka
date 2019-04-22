import db from '../db/index';

const checkBankAccount = async (req, res, next) => {
  const checkQuery = 'SELECT * FROM accounts WHERE account_number = $1';
  try {
    const { rows } = await db.query(checkQuery, [req.params.accountNumber]);
    if (!rows[0]) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    return next();
  } catch (error) {
    res.status(400).send(error);
  }
};
export default checkBankAccount;
