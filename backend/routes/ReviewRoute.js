import express from 'express';

import { createReview, getReviews } from '../controllers/ReviewController.js';
import { authUserMiddleware } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.get('/create', authUserMiddleware, createReview);

export default router;
