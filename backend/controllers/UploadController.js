import { uploadImageService } from '../services/uploadServices/uploadImageService.js';
import { uploadImagesService } from '../services/uploadServices/uploadImagesService.js';

export const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        const imageUrl = uploadImageService(file);

        res.status(200).json({
            success: true,
            message: 'Upload ảnh thành công',
            imageUrl,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Upload ảnh thất bại',
            error: error.message,
        });
    }
};

export const uploadImages = async (req, res) => {
    try {
        const files = req.files;
        if (!files)
            return res.status(400).json({ message: 'No file uploaded' });

        const imageUrls = uploadImagesService(files);

        res.status(200).json({
            success: true,
            message: 'Upload danh sách ảnh thành công',
            imageUrls,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Upload danh sách ảnh thất bại',
            error: error.message,
        });
    }
};
