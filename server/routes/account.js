import express from 'express';
import accountController from '../controllers/account';
import bankAccountSchema from '../validation/bankAccountValidation';
import transactionSchema from '../validation/transactionValidation';
import validator from '../middleware/validator';
import { verifyToken } from '../middleware/verifyToken';
import { checkIfAdminStaff } from '../helpers/checkIfAdminStaff';
import { checkIfStaff } from '../helpers/checkIfStaff';

const router = express.Router();

router.post('/accounts', validator(bankAccountSchema), accountController.createBankAccount);
router.get('/accounts/:accountNumber', accountController.findBankAccount);
router.patch('/accounts/:accountNumber', verifyToken, checkIfAdminStaff, accountController.activateDeactivate);
router.post('/transactions/:accountNumber/credit', verifyToken, checkIfStaff, validator(transactionSchema), accountController.creditAccount);


export default router;
