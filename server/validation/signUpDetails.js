import Joi from 'joi';

const signUpDetails = {
  email: Joi.string().email().required(),
  firstName: Joi.string().regex(/^[A-Za-z]+$/).required(),
  lastName: Joi.string().regex(/^[A-Za-z]+$/).required(),
  password: Joi.string().min(6).required(),
};
export default signUpDetails;
