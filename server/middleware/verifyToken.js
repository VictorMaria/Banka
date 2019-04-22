import jwt from 'jsonwebtoken';
import db from '../db/index';

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ status: 400, error: 'Token is not provided' });
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET);
    const text = 'SELECT is_admin, is_staff FROM users WHERE id = $1';
    const { rows } = await db.query(text, [decoded.userId]);
    if (!rows[0]) {
      return res.status(400).send({ status: 400, error: 'The token you provided is invalid' });
    }
    req.user = {
      id: decoded.userId,
      is_admin: decoded.admin,
      is_staff: decoded.staff,
    };
    return next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default verifyToken;
