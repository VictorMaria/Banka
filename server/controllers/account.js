import Joi from 'joi';
import accountModel from '../models/account';
import bankAccountSchema from '../validation/bankAccountValidation';

const account = {
  createBankAccount(req, res) {
    const result = Joi.validate(req.body, bankAccountSchema);
    if (result.error) {
      return res.status(400).send({ status: 400, error: result.error.details[0].message });
    }
    const bankAccount = accountModel.createBankAccount(req.body);
    return res.status(201).send({ status: 201, data: bankAccount });
  },
};
export default account;
