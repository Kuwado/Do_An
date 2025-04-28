import express from 'express';
import { getAdminById } from '../controllers/AdminController.js';

const router = express.Router();

router.get('/:id', getAdminById);

export default router;
