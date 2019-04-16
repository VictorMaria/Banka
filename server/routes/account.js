import express from 'express';
import accountController from '../controllers/account';
import bankAccountSchema from '../validation/bankAccountValidation';
import validator from '../middleware/validator';

const router = express.Router();

router.post('/accounts', validator(bankAccountSchema), accountController.createBankAccount);


export default router;
