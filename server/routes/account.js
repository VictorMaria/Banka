import express from 'express';
import newbankAccountDetails from '../validation/newBankAccountDetails';
import Account from '../controllers/account';
import validator from '../middleware/validator';

const router = express.Router();

router.post('/accounts', validator(newbankAccountDetails), Account.createBankAccount);

export default router;
