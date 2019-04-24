import express from 'express';
import Transaction from '../controllers/transaction';
import transactionDetails from '../validation/transactionDetails';
import validator from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';
import checkIfStaffAdmin from '../helpers/checkIfAdminStaff';
import checkBankAccount from '../helpers/checkBankAccount';

const router = express.Router();

router.post('/transactions/:accountNumber/credit', verifyToken, checkIfStaffAdmin, validator(transactionDetails),
  checkBankAccount, Transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', verifyToken, checkIfStaffAdmin, validator(transactionDetails),
  checkBankAccount, Transaction.debitAccount);

export default router;
