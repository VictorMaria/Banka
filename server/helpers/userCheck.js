import userQueries from '../models/user';
import db from '../db';

const userCheck = async (req, res, next) => {
  try {
    const { rows } = await db.query(userQueries.checkUserByEmail, [req.params.email.toLowerCase()]);
    if (!rows[0]) {
      return res.status(404).send({ status: 404, error: 'User not found' });
    }
    if (rows[0].id !== req.user.id) {
      return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });
    }
    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
};
export default userCheck;
