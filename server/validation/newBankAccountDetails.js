import Joi from 'joi';

const newBankAccountDetails = {
  type: Joi.string().regex(/^savings$|^current$/).required(),
  openingBalance: Joi.number().min(50),
};
export default newBankAccountDetails;
