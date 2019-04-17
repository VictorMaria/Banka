import Joi from 'joi';

const signInDetails = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
export default signInDetails;
