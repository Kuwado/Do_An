import express from 'express';
import multer from 'multer';

import {
    createUser,
    getUserById,
    getUserByPhone,
    updateUser,
} from '../controllers/UserController.js';

const router = express.Router();
const upload = multer();

router.get('/:id', getUserById);
router.get('/phone/:phone', getUserByPhone);
router.post('/create', createUser);
router.post('/update/:id', upload.single('avatar'), updateUser);

export default router;
