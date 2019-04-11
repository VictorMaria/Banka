import express from 'express';
import account from '../controllers/account';

const router = express.Router();

router.post('/accounts', account.createBankAccount);

export default router;
