import express from 'express';
import multer from 'multer';
import { uploadImage, uploadImages } from '../controllers/UploadController.js';

const router = express.Router();
const upload = multer();

router.post('/image', upload.single('image'), uploadImage);
router.post('/images', upload.array('images', 10), uploadImages);

export default router;
