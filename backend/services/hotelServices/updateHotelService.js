import models from '../../models/index.js';
import { Op } from 'sequelize';
import { deleteImagesService } from '../uploadServices/deleteImagesService.js';
import { uploadImagesService } from '../uploadServices/uploadImagesService.js';
import { uploadImageService } from '../uploadServices/uploadImageService.js';
import axios from 'axios';

const OPENCAGE_API_KEY = '124b491e07714ba7a1a19570431a68d3';

export const getCoordinatesFromAddress = async (address) => {
    try {
        const response = await axios.get(
            'https://api.opencagedata.com/geocode/v1/json',
            {
                params: {
                    q: address,
                    key: OPENCAGE_API_KEY,
                    language: 'vi',
                    limit: 1,
                },
            },
        );

        const results = response.data.results;
        console.log(response);
        console.log(results);
        if (results.length > 0) {
            const { lat, lng } = results[0].geometry;
            return { lat, lon: lng };
        } else {
            throw new Error('Không tìm thấy tọa độ cho địa chỉ này');
        }
    } catch (error) {
        console.error('Lỗi khi gọi OpenCage API:', error.message);
        return null;
    }
};

export const updateHotelService = async (hotel, updateData) => {
    if (updateData.images && updateData.images.length > 0) {
        const oldImages = JSON.parse(hotel.images);
        if (oldImages && oldImages != []) {
            deleteImagesService(oldImages);
        }
        const imageUrls = uploadImagesService(updateData.images);
        if (imageUrls == []) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.images = JSON.stringify(imageUrls);
    } else {
        updateData.images = hotel.images;
    }

    if (updateData.avatar && updateData.avatar !== hotel.avatar) {
        const oldImages = hotel.avatar;
        if (oldImages) {
            deleteImagesService([oldImages]);
        }
        const imageUrl = uploadImageService(updateData.avatar);
        if (!imageUrl) {
            throw new Error(`Lỗi upload ảnh`);
        }
        updateData.avatar = imageUrl;
    } else {
        updateData.avatar = hotel.avatar;
    }

    if (updateData.address && updateData.address !== hotel.address) {
        const coords = await getCoordinatesFromAddress(updateData.address);

        console.log(coords);

        if (coords) {
            updateData.lat = coords.lat;
            updateData.lon = coords.lon;
        }
    }

    Object.entries(updateData).forEach(([key, value]) => {
        if (hotel[key] !== undefined) {
            hotel[key] = value;
        }
    });

    await hotel.save();

    return hotel;
};
