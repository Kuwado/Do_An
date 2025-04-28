import { getReviewsService } from '../services/review/getReviewsService.js';

export const getReviews = async (req, res) => {
    const hotelId = req.query.hotel_id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    try {
        const result = await getReviewsService({
            hotelId,
            page,
            limit,
        });
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
