import Joi from 'joi';

const signUpDetails = {
  email: Joi.string().email().max(45).required(),
  firstName: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(35)
    .required(),
  lastName: Joi.string().regex(/^[A-Za-z]+$/).min(2).max(35)
    .required(),
  password: Joi.string().min(6).alphanum().required(),
};
export default signUpDetails;
