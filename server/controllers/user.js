import helper from '../helpers/helpers';
import userQueries from '../models/user';
import accountQueries from '../models/account';
import db from '../db/index';
import refine from '../helpers/refine';

class User {
  static async signUp(req, res) {
    const hashedPassword = helper.hashPassword(req.body.password);
    const userType = 'client';
    const defaultProfilePhoto = 'ninja-avi.jpg';
    const values = [
      refine(req.body.firstName),
      refine(req.body.lastName),
      (req.body.email).toLowerCase(),
      hashedPassword,
      userType,
      defaultProfilePhoto,
    ];
    try {
      const { rows } = await db.query(userQueries.newUserQuery, values);
      const userToken = helper.generateToken(
        rows[0].id,
        rows[0].first_name,
        rows[0].last_name,
        rows[0].email,
        rows[0].type,
        rows[0].is_admin,
        rows[0].is_staff,
      );
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
      const { rows } = await db.query(userQueries.signInQuery, [req.body.email.toLowerCase()]);
      if (!rows[0]) {
        return res.status(401).send({ status: 401, error: 'Incorrect Credentials' });
      }
      if (!helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).send({ status: 401, error: 'Incorrect Credentials' });
      }
      const userToken = helper.generateToken(
        rows[0].id,
        rows[0].first_name,
        rows[0].last_name,
        rows[0].email,
        rows[0].type,
        rows[0].is_admin,
        rows[0].is_staff,
      );
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
    return true;
  }

  static async myAccountDetails(req, res) {
    try {
      const myAccount = await db.query(userQueries.myAccountQuery, [req.params.accountNumber]);
      return res.status(200).send({ status: 200, data: myAccount.rows[0] });
    } catch (error) {
      return res.send(500).send(error);
    }
  }

  static async myTransactionHistory(req, res) {
    try {
      const transactionHistory = await db.query(userQueries.myTransactionHistoryQuery,
        [req.params.accountNumber]);
      if (!transactionHistory.rows[0]) {
        return res.status(200).send({ status: 200, error: 'No transactions here' });
      }
      return res.status(200).send({ status: 200, data: transactionHistory.rows });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async uploadProfilePhoto(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send({ status: 400, error: 'Select an Image' });
      }
      const values = [
        req.file.path,
        req.params.id,
      ];
      const uploadPhoto = await db.query(userQueries.uploadPhotoQuery, values);
      return res.status(200).send({ status: 200, data: uploadPhoto.rows[0] });
    } catch (error) {
      res.status(500).send(error);
    }
    return true;
  }

  static async getAllMyBankAccounts(req, res) {
    try {
      const { rows } = await db.query(accountQueries.getAllBankAccountsForOneUserQuery,
        [req.params.email]);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, error: 'You have no bank account' });
      }
      return res.status(200).send({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const { rows } = await db.query(userQueries.allUsers);
      if (!rows[0]) {
        return res.status(200).send({ status: 200, error: 'There is no one here yet' });
      }
      return res.status(200).send({ status: 200, data: rows });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async getUser(req, res) {
    try {
      const { rows } = await db.query(userQueries.oneUser, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'User not found' });
      }
      const user = {
        id: rows[0].id,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        email: rows[0].email,
        type: rows[0].type,
        isAdmin: rows[0].is_admin,
        isStaff: rows[0].is_staff,
        profilePhoto: rows[0].profile_photo,
      };
      return res.status(200).send({ status: 200, data: user });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  static async makeUserAStaff(req, res) {
    try {
      const { rows } = await db.query(userQueries.oneUser, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'User not found' });
      }
      if (rows[0].type === 'client') {
        const staffValues = [
          'staff',
          true,
          req.params.id,
        ];
        const makeStaff = await db.query(userQueries.staffStatusQuery, staffValues);
        const response = {
          type: makeStaff.rows[0].type,
          isAdmin: makeStaff.rows[0].is_admin,
          isStaff: makeStaff.rows[0].is_staff,
        };
        return res.status(200).send({ status: 200, data: response });
      }
      const clientValues = [
        'client',
        false,
        req.params.id,
      ];
      const makeClient = await db.query(userQueries.staffStatusQuery, clientValues);
      const response = {
        type: makeClient.rows[0].type,
        isAdmin: makeClient.rows[0].is_admin,
        isStaff: makeClient.rows[0].is_staff,
      };
      return res.status(200).send({ status: 200, data: response });
    } catch (error) {
      res.status(500).send(error);
    }
    return true;
  }

  static async makeUserAnAdmin(req, res) {
    try {
      const { rows } = await db.query(userQueries.oneUser, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 404, error: 'User not found' });
      }
      if (rows[0].type === 'client') {
        const adminValues = [
          'admin',
          true,
          req.params.id,
        ];
        const makeAdmin = await db.query(userQueries.adminStatusQuery, adminValues);
        const response = {
          type: makeAdmin.rows[0].type,
          isAdmin: makeAdmin.rows[0].is_admin,
          isStaff: makeAdmin.rows[0].is_staff,
        };
        return res.status(200).send({ status: 200, data: response });
      }
      const clientValues = [
        'client',
        false,
        req.params.id,
      ];
      const makeClient = await db.query(userQueries.adminStatusQuery, clientValues);
      const response = {
        type: makeClient.rows[0].type,
        isAdmin: makeClient.rows[0].is_admin,
        isStaff: makeClient.rows[0].is_staff,
      };
      return res.status(200).send({ status: 200, data: response });
    } catch (error) {
      res.status(500).send(error);
    }
    return true;
  }
}
export default User;
