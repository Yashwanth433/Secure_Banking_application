import express from 'express';
import { register, login, registerValidation, loginValidation, getProfile, updateProfile, updateProfileValidation, changePassword, changePasswordValidation } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfileValidation, updateProfile);
router.post('/change-password', authenticateToken, changePasswordValidation, changePassword);

export default router;