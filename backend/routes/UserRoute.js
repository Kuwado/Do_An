import express from 'express';
import { getUserById } from '../controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUserById);

export default router;
