import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, firstName, lastName, email, type, isAdmin, isStaff) {
    const token = jwt.sign({
      userId: id, firstName, lastName, email, type, admin: isAdmin, staff: isStaff,
    },
    process.env.SECRET, { expiresIn: '13m' });
    return token;
  },
};
export default helper;
