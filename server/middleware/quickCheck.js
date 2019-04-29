import userQueries from '../models/user';
import db from '../db/index';

const quickCheck = async (req, res, next) => {
  const checkUser = await db.query(userQueries.getUserQuery, [req.params.id]);
  if (!checkUser.rows[0]) {
    return res.status(404).send({ status: 404, error: 'User not found' });
  }
  return next();
};
export default quickCheck;
