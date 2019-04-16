import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, isAdmin, isStaff) {
    const token = jwt.sign({
      userId: id, admin: isAdmin, staff: isStaff,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};
export default helper;
