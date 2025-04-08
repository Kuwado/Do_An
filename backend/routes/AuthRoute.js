import express from 'express';
import {
    loginUser,
    loginAdmin,
    loginAdminFirstStep,
} from '../controllers/AuthController.js';

const router = express.Router();

// Route đăng nhập cho User
router.post('/login/user', loginUser);

// Route đăng nhập cho Admin
router.post('/login/admin/first-step', loginAdminFirstStep);
router.post('/login/admin', loginAdmin);

export default router;
