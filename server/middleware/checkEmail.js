import db from '../db/index';

const checkEmail = async (req, res, next) => {
  const checkQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await db.query(checkQuery, [req.body.email.toLowerCase()]);
    if (rows[0]) {
      return res.status(400).send({ status: 400, error: 'Email already in use' });
    }
    return next();
  } catch (error) {
    res.status(400).send(error);
  }
};

export default checkEmail;
