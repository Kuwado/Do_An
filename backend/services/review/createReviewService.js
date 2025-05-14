import models from '../../models/index.js';

export const createReviewService = async (data) => {
    const review = await models.Review.create(data);
    return review;
};
