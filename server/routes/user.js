import express from 'express';
import userController from '../controllers/user';
import upload from '../helpers/upload-profile-photo';
import validator from '../middleware/validator';
import signUpDetails from '../validation/signUpDetails';
import signInDetails from '../validation/signInDetails';

const router = express.Router();

router.post('/auth/signup', validator(signUpDetails), userController.signUp);
router.post('/auth/signin', validator(signInDetails), userController.signIn);
router.get('/users/:id', userController.getUser);
router.post('/users/:id/profilephotos', userController.quickCheck, upload.single('profilePhoto'), userController.uploadProfilePhoto);


export default router;
