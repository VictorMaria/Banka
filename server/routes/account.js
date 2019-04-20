import express from 'express';
import newbankAccountDetails from '../validation/newBankAccountDetails';
import validator from '../middleware/validator';

const router = express.Router();

router.post('/accounts', validator(newbankAccountDetails));

export default router;
