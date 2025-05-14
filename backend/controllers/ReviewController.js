import { createReviewService } from '../services/review/createReviewService.js';
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

export const createReview = async (req, res) => {
    try {
        const reviewData = req.body;
        reviewData.user_id = req.user.id;

        // Tạo booking
        const review = await createReviewService(reviewData);

        res.status(201).json({
            success: true,
            message: 'Tạo thành công đánh giá',
            review,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Đặt dịch vụ thất bại!',
            error: error.message,
        });
    }
};
