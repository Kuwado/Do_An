import fs from 'fs';
import path from 'path';

export const deleteImagesService = (imagePaths = []) => {
    const deleted = [];
    const notFound = [];

    imagePaths.forEach((imagePath) => {
        // Trường hợp imagePath là: /uploads/images/123.jpg
        const fullPath = path.join(
            process.cwd(),
            imagePath.startsWith('/') ? imagePath.slice(1) : imagePath,
        );

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            deleted.push(imagePath);
        } else {
            notFound.push(imagePath);
        }
    });

    return {
        deleted,
        notFound,
    };
};
