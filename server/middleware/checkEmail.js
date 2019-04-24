/* eslint-disable consistent-return */
import db from '../db/index';
import userQueries from '../models/user';

const checkEmail = async (req, res, next) => {
  try {
    const { rows } = await db.query(userQueries.checkEmailQuery, [req.body.email.toLowerCase()]);
    if (rows[0]) {
      return res.status(400).send({ status: 400, error: 'Email already in use' });
    }
    return next();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default checkEmail;
