import User from '../models/user';
import helper from '../helpers/helpers';

class userController {
  static signUp(req, res) {
    const checkUser = User.checkForEmail(req.body);
    if (checkUser) {
      return res.status(400).send({ status: 400, error: 'Email already in use' });
    }
    const newUser = User.signUp(req.body);
    return res.status(200).send({ status: 200, data: newUser });
  }

  static signIn(req, res) {
    const checkUser = User.checkForEmail(req.body);
    if (!checkUser) {
      return res.status(400).send({ status: 400, error: 'Incorrect Email' });
    }
    if (!helper.comparePassword(checkUser.password, req.body.password)) {
      return res.status(400).send({ status: 400, error: 'Incorrect Password' });
    }
    const signInResponse = User.signIn(req.body);
    return res.status(200).send({ status: 200, data: signInResponse });
  }
}

export default userController;
