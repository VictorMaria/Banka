import express from 'express';
import user from '../controllers/user';
import upload from '../helpers/upload-profile-photo';

const router = express.Router();

router.post('/auth/signup', user.signUp);
router.post('/auth/signin', user.signIn);
router.get('/users/:id', user.getUser);
router.post('/users/:id/profilephotos', user.quickCheck, upload.single('profilePhoto'), user.uploadProfilePhoto);

export default router;
