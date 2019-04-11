import Joi from 'joi';

const transactionSchema = {
  cashier: Joi.number().positive().required(),
  remark: Joi.string().max(25).required(),
  amount: Joi.string().regex(/^[0-9]+\.[0-9]{2}$/).required(),
};
export default transactionSchema;
