import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const uploadImagesService = (files = []) => {
    const imageUrls = [];

    if (files.length > 0) {
        files.forEach((file) => {
            const ext = path.extname(file.originalname); // giữ lại đuôi file như .jpg, .png
            const fileName = `${Date.now()}-${uuidv4()}${ext}`;
            const uploadPath = path.join('uploads/images', fileName);

            // Ghi file vào ổ đĩa
            fs.writeFileSync(uploadPath, file.buffer);

            // URL public để FE truy cập được
            const imageUrl = `/uploads/images/${fileName}`;
            imageUrls.push(imageUrl);
        });
    }

    return imageUrls;
};
