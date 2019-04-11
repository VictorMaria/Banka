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
  findBankAccount(req, res) {
    const bankAccount = accountModel.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    return res.status(200).send({ status: 200, data: bankAccount});
  },
  activateDeactivate(req, res) {
    const bankAccount = accountModel.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    const activateDeactivate = accountModel.activateDeactivate(req.params.accountNumber);
    return res.status(200).send({ status: 200, data: activateDeactivate });
  }, 
};
export default account;