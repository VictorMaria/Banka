import Joi from 'joi';

const newBankAccountDetails = {
  userID: Joi.number().positive().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().regex(/^savings$|^current$/).required(),
  openingBalance: Joi.string().regex(/^[0-9]+\.[0-9]{2}$/).required(),
};
export default newBankAccountDetails;
