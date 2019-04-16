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

  static creditAccount(req, res) {
    const bankAccount = Account.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    const creditAccountResponse = Account.creditAccount(req.params.accountNumber, req.body);
    return res.status(200).send({ status: 200, data: creditAccountResponse });
  }

  static debitAccount(req, res) {
    const bankAccount = Account.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    const debitAccount = Account.debitAccount(req.params.accountNumber, req.body);
    if (debitAccount === 'Insufficient Funds') {
      return res.status(400).send({ status: 400, error: debitAccount });
    }
    return res.status(200).send({ status: 200, data: debitAccount });
  }

  static deleteBankAccount(req, res) {
    const bankAccount = Account.findBankAccount(req.params.accountNumber);
    if (!bankAccount) {
      return res.status(404).send({ status: 404, error: 'Bank Account not found' });
    }
    const deleteBankAccount = Account.deleteBankAccount(req.params.accountNumber);
    return res.status(200).send({ status: 200, message: deleteBankAccount });
  }
}
export default accountController;
