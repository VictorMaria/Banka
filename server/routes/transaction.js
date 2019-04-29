import express from 'express';
import Transaction from '../controllers/transaction';
import transactionDetails from '../validation/transactionDetails';
import validator from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';
import checkIfStaffAdmin from '../helpers/checkIfAdminStaff';
import checkBankAccount from '../helpers/checkBankAccount';
import checkIfStaff from '../helpers/checkIfStaff';


const router = express.Router();

router.post('/transactions/:accountNumber/credit', verifyToken, checkIfStaff, validator(transactionDetails),
  checkBankAccount, Transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', verifyToken, checkIfStaff, validator(transactionDetails),
  checkBankAccount, Transaction.debitAccount);
router.get('/transactions', verifyToken, checkIfStaffAdmin, Transaction.getAllTransactions);
router.get('/transactions/:transactionId', verifyToken, Transaction.getTransaction);

export default router;
