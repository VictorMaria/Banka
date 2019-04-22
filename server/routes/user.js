import express from 'express';
import User from '../controllers/user';
import validator from '../middleware/validator';
import signUpDetails from '../validation/signUpDetails';
import checkEmail from '../middleware/checkEmail';

const router = express.Router();

router.post('/auth/signup', validator(signUpDetails), checkEmail, User.signUp);

export default router;
