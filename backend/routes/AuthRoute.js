import express from 'express';
import { loginUser, loginStaff } from '../controllers/AuthController.js';

const router = express.Router();

// Route đăng nhập cho User
router.post('/login/user', loginUser);

// Route đăng nhập cho Staff
router.post('/login/staff', loginStaff);

export default router;
