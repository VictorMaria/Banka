import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, isAdmin) {
    const token = jwt.sign({
      userId: id, admin: isAdmin,
    },
    process.env.SECRET, { expiresIn: '1d' });
    return token;
  },
};
export default helper;
