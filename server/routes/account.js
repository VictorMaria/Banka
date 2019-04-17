import express from 'express';
import accountController from '../controllers/account';
import newbankAccountDetails from '../validation/newBankAccountDetails';
import transactionDetails from '../validation/transactionDetails';
import validator from '../middleware/validator';
import { verifyToken } from '../middleware/verifyToken';
import { checkIfAdminStaff } from '../helpers/checkIfAdminStaff';
import { checkIfStaff } from '../helpers/checkIfStaff';

const router = express.Router();

router.post('/accounts', validator(newbankAccountDetails), accountController.createBankAccount);
router.get('/accounts/:accountNumber', accountController.findBankAccount);
router.patch('/accounts/:accountNumber', verifyToken, checkIfAdminStaff, accountController.activateDeactivate);
router.get('/accounts/:accountNumber/balance', accountController.checkBalance);
router.post('/transactions/:accountNumber/credit', verifyToken, checkIfStaff, validator(transactionDetails), accountController.creditAccount);
router.post('/transactions/:accountNumber/debit', verifyToken, checkIfStaff, validator(transactionDetails), accountController.debitAccount);
router.delete('/accounts/:accountNumber', verifyToken, checkIfAdminStaff, accountController.deleteBankAccount);


export default router;
