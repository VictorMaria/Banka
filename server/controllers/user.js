import helper from '../helpers/helpers';
import userQueries from '../models/user';
import db from '../db/index';

class User {
  static async signUp(req, res) {
    const hashedPassword = helper.hashPassword(req.body.password);
    const userType = 'client';
    const defaultProfilePhoto = 'ninja-avi.jpg';
    const values = [
      req.body.firstName,
      req.body.lastName,
      (req.body.email).toLowerCase(),
      hashedPassword,
      userType,
      defaultProfilePhoto,
    ];
    try {
      const { rows } = await db.query(userQueries.newUserQuery, values);
      const userToken = helper.generateToken(rows[0].id, rows[0].is_admin, rows[0].is_staff);
      const response = {
        status: 200,
        data: {
          token: userToken,
          id: rows[0].id,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          type: rows[0].type,
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async signIn(req, res) {
    try {
      const { rows } = await db.query(userQueries.signInQuery, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ status: 400, error: 'Incorrect Credentials' });
      }
      if (!helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ status: 400, error: 'Incorrect Credentials' });
      }
      const userToken = helper.generateToken(rows[0].id, rows[0].is_admin, rows[0].is_staff);
      const response = {
        status: 200,
        data: {
          token: userToken,
          id: rows[0].id,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          type: rows[0].type,
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
export default User;
