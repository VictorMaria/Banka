import jwt from 'jsonwebtoken';
import user from '../models/user';


const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ status: 400, error: 'Token is not provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const fetchUser = user.getUser(decoded.userId);
    if (!fetchUser) {
      return res.status(400).send({ status: 400, error: 'The token you provided is invalid' });
    }
    req.user = {
      id: decoded.userId,
      isAdmin: decoded.admin,
      isStaff: decoded.staff,
    };
    return next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

// eslint-disable-next-line import/prefer-default-export
export { verifyToken };
