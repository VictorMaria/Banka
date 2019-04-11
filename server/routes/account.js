import express from 'express';
import account from '../controllers/account';

const router = express.Router();

router.post('/accounts', account.createBankAccount);
router.get('/accounts/:accountNumber', account.findBankAccount);
router.patch('/accounts/:accountNumber', account.activateDeactivate);
router.get('/accounts/:accountNumber/balance', account.checkBalance);
router.post('/transactions/:accountNumber/credit', account.creditAccount);
router.post('/transactions/:accountNumber/debit', account.debitAccount);

export default router;
