import Joi from 'joi';
import userModel from '../models/user';
import signUpSchema from '../validation/signUpValidation';
import signInSchema from '../validation/signInValidation';
import helper from '../helpers/helpers';

const user = {
  signUp(req, res) {
    const result = Joi.validate(req.body, signUpSchema);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    const checkUser = userModel.checkForEmail(req.body);
    if (checkUser) {
      return res.status(400).send({ status: 400, error: 'Email already in use' });
    }
    const newUser = userModel.signUp(req.body);
    return res.status(201).send({ status: 201, data: newUser });
  },
  signIn(req, res) {
    const result = Joi.validate(req.body, signInSchema);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    const checkUser = userModel.checkForEmail(req.body);
    if (!checkUser) {
      return res.status(400).send({ status: 400, error: 'Incorrect Email' });
    }
    if (!helper.comparePassword(checkUser.password, req.body.password)) {
      return res.status(400).send({ status: 400, error: 'Incorrect Password' });
    }
    const signInResponse = userModel.signIn(req.body);
    return res.status(200).send({ status: 200, data: signInResponse });
  },
  getUser(req, res) {
    const checkUser = userModel.getUser(req.params.id);
    if (!checkUser) {
      return res.status(404).send({ status: 404, error: 'User not found' });
    }
    return res.status(200).send({ status: 200, data: checkUser });
  },
  quickCheck(req, res, next) {
    const checkUser = userModel.quickCheck(req.params.id);
    if (!checkUser) {
      return res.status(404).send({ status: 404, error: 'User not found' });
    }
    return next();
  },
  uploadProfilePhoto(req, res) {
    const response = userModel.uploadProfilePhoto(req.params.id, req.file);
    if (response === 'Select an Image') {
      return res.status(400).send({ status: 400, error: 'Select an Image' });
    }
    return res.status(200).send({ status: 200, data: response });
  },
};

export default user;
