import express from 'express';
import userController from '../controllers/user';
import upload from '../helpers/upload-profile-photo';
import validator from '../middleware/validator';
import signUpSchema from '../validation/signUpValidation';
import signInSchema from '../validation/signInValidation';

const router = express.Router();

router.post('/auth/signup', validator(signUpSchema), userController.signUp);
router.post('/auth/signin', validator(signInSchema), userController.signIn);
router.get('/users/:id', userController.getUser);
router.post('/users/:id/profilephotos', userController.quickCheck, upload.single('profilePhoto'), userController.uploadProfilePhoto);


export default router;
