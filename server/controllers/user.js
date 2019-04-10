import Joi from 'joi';
import userModel from '../models/user';
import signUpSchema from '../validation/signUpValidation';

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
};

export default user;
