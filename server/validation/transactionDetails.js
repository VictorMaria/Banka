import Joi from 'joi';

const transactionDetails = {
  remark: Joi.string().max(25).required(),
  amount: Joi.string().regex(/^[0-9]+\.[0-9]{2}$/).required(),
};
export default transactionDetails;
