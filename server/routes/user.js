import express from 'express';
import User from '../controllers/user';
import validator from '../middleware/validator';
import signUpDetails from '../validation/signUpDetails';
import signInDetails from '../validation/signInDetails';
import checkEmail from '../middleware/checkEmail';
import verifyToken from '../middleware/verifyToken';
import checkUser from '../middleware/checkUser';
import checkBankAccount from '../helpers/checkBankAccount';

const router = express.Router();

router.post('/auth/signup', validator(signUpDetails), checkEmail, User.signUp);
router.post('/auth/signin', validator(signInDetails), User.signIn);
router.get('/accounts/:accountNumber/transactions', verifyToken, checkBankAccount, checkUser, User.myTransactionHistory);

export default router;
