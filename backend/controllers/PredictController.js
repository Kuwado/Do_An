import { predictGuestsService } from '../services/predictServices/predictGuestsService.js';
import models from '../models/index.js';

export const predictGuests = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;

        const result = await predictGuestsService({ hotelId });

        const predictedData = await models.Predict.findAll({
            where: { hotel_id: hotelId },
            order: [['date', 'DESC']],
            limit: 7,
        });

        res.status(200).json({
            success: true,
            message: 'Lấy dự đoán thành công',
            weather: result.weather,
            temp: result.temp,
            city: result.city,
            predicts: result.predicts,
            predictedData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Lấy dự đoán thất bại',
            error: error.message,
        });
    }
};
