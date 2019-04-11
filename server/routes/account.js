import express from 'express';
import account from '../controllers/account';

const router = express.Router();

router.post('/accounts', account.createBankAccount);
router.get('/accounts/:accountNumber', account.findBankAccount);
router.patch('/accounts/:accountNumber', account.activateDeactivate);

export default router;
