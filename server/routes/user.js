import express from 'express';
import User from '../controllers/user';
import validator from '../middleware/validator';
import signUpDetails from '../validation/signUpDetails';
import signInDetails from '../validation/signInDetails';
import checkEmail from '../middleware/checkEmail';
import verifyToken from '../middleware/verifyToken';
import userStaffAdmin from '../helpers/userStaffAdminCheck';
import checkIfAdmin from '../helpers/checkIfAdmin';
import userCheck from '../helpers/userCheck';
import checkBankAccount from '../helpers/checkBankAccount';
import upload from '../helpers/upload-profile-photo';
import quickCheck from '../middleware/quickCheck';

const router = express.Router();

router.post('/auth/signup', validator(signUpDetails), checkEmail, User.signUp);
router.post('/auth/signin', validator(signInDetails), User.signIn);
router.get('/self/:email/accounts', verifyToken, userCheck, User.getAllMyBankAccounts);
router.get('/users', verifyToken, checkIfAdmin, User.getAllUsers);
router.get('/users/:id', verifyToken, checkIfAdmin, User.getUser);
router.patch('/users/:id/staff', verifyToken, checkIfAdmin, User.makeUserAStaff);
router.patch('/users/:id/admin', verifyToken, checkIfAdmin, User.makeUserAnAdmin);
router.get('/accounts/:accountNumber/transactions', verifyToken, checkBankAccount, userStaffAdmin, User.myTransactionHistory);
router.post('/users/:id/profilephotos', verifyToken, quickCheck, upload.single('profilePhoto'), User.uploadProfilePhoto);
export default router;
