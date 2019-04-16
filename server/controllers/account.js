import Account from '../models/account';

class accountController {
  static createBankAccount(req, res) {
    const bankAccount = Account.createBankAccount(req.body);
    return res.status(201).send({ status: 201, data: bankAccount });
  }

  static findBankAccount(req, res) {
    const bankAccount = Account.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    return res.status(200).send({ status: 200, data: bankAccount });
  }

  static activateDeactivate(req, res) {
    const bankAccount = Account.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    const activateDeactivate = Account.activateDeactivate(req.params.accountNumber);
    return res.status(200).send({ status: 200, data: activateDeactivate });
  }
}
export default accountController;
