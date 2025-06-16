import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

export const uploadImageService = (file) => {
    const ext = path.extname(file.originalname); // giữ lại đuôi file như .jpg, .png
    const fileName = `${Date.now()}-${uuidv4()}${ext}`;
    const uploadPath = path.join('uploads/images', fileName);

    fs.writeFileSync(uploadPath, file.buffer);

    const imageUrl = `/uploads/images/${fileName}`;
    return imageUrl;
};
