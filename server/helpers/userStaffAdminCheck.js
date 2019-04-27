import userQueries from '../models/user';
import db from '../db';

const userStaffAdminCheck = async (req, res, next) => {
  try {
    const { rows } = await db.query(userQueries.checkUser, [req.params.accountNumber]);
    if (rows[0].user_id !== req.user.id && !req.user.is_staff && !req.user.is_admin) {
      return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });
    }
    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
};
export default userStaffAdminCheck;
