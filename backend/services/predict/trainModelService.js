import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const apiUrl = process.env.ML_API;

export const trainModelService = async ({ hotelId = 1 }) => {
    try {
        const form = new FormData();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const filePath = path.resolve(
            __dirname,
            `../../data/data_${hotelId}.csv`,
        );

        form.append('file', fs.createReadStream(filePath));
        form.append('hotel_id', hotelId);

        const response = await axios.post(`${apiUrl}/train`, form, {
            headers: form.getHeaders(),
        });

        console.log(response.data);
        return response.data;
    } catch (err) {
        return { success: false, error: err.message };
    }
};
