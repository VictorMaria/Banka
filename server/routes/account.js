import express from 'express';
import newbankAccountDetails from '../validation/newBankAccountDetails';
import Account from '../controllers/account';
import validator from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';
import checkIfStaffAdmin from '../helpers/checkIfAdminStaff';

const router = express.Router();

router.post('/accounts', validator(newbankAccountDetails), Account.createBankAccount);
router.get('/accounts/:accountNumber', verifyToken, checkIfStaffAdmin, Account.getBankAccount);
export default router;
