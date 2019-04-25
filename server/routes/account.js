import express from 'express';
import newbankAccountDetails from '../validation/newBankAccountDetails';
import Account from '../controllers/account';
import validator from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';
import checkIfStaffAdmin from '../helpers/checkIfAdminStaff';
import checkBankAccount from '../helpers/checkBankAccount';

const router = express.Router();

router.post('/accounts', verifyToken, validator(newbankAccountDetails), Account.createBankAccount);
router.get('/accounts/:accountNumber', verifyToken, checkIfStaffAdmin, Account.getBankAccount);
router.patch('/accounts/:accountNumber', verifyToken, checkIfStaffAdmin, checkBankAccount, Account.activateDeactivate);
router.get('/accounts', verifyToken, checkIfStaffAdmin, Account.getAllBankAccounts);
router.get('/user/:email/accounts', verifyToken, checkIfStaffAdmin, Account.getAllBankAccountsForOneUser);
router.delete('/accounts/:accountNumber', verifyToken, checkIfStaffAdmin, checkBankAccount, Account.deleteBankAccount);
export default router;
