import Joi from 'joi';

const newBankAccountDetails = {
  type: Joi.string().regex(/^savings$|^current$/).required(),
  openingBalance: Joi.string().regex(/^[0-9]+\.[0-9]{2}$/),
};
export default newBankAccountDetails;
