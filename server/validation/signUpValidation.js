import Joi from 'joi';

const signUpSchema = {
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).required(),
};
export default signUpSchema;
