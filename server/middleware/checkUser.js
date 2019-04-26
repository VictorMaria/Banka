import userQueries from '../models/user';
import db from '../db';

const checkUser = async (req, res, next) => {
  try {
    const { rows } = await db.query(userQueries.checkUser, [req.params.accountNumber]);
    if (rows[0].user_id !== req.user.id) {
      return res.status(401).send({ status: 401, error: 'Unauthorized!' });
    }
    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
};
export default checkUser;
