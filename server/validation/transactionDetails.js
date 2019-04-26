import Joi from 'joi';

const transactionDetails = {
  remark: Joi.string().max(25),
  amount: Joi.number().min(50).required(),
};
export default transactionDetails;
