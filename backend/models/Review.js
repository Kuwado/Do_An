import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import models from './index.js';

class Review extends Model {
    static associate(models) {
        Review.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });
        Review.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    }
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'hotels',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        images: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: false,
    },
);

// Hook để cập nhật lại rating trung bình khi thêm mới hoặc chỉnh sửa review
Review.addHook('afterCreate', async (review) => {
    const hotel = await models.Hotel.findByPk(review.hotel_id);
    const reviews = await models.Review.findAll({
        where: { hotel_id: hotel.id },
    });
    // const reviews = await hotel.getReviews();

    // Tính toán lại rating trung bình
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Cập nhật lại rating trung bình cho khách sạn
    await hotel.update({ rating: averageRating });
});

Review.addHook('afterUpdate', async (review) => {
    const hotel = await models.Hotel.findByPk(review.hotel_id);
    const reviews = await hotel.getReviews(); // Lấy tất cả reviews của khách sạn

    // Tính toán lại rating trung bình
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Cập nhật lại rating trung bình cho khách sạn
    await hotel.update({ rating: averageRating });
});

Review.addHook('afterDestroy', async (review) => {
    const hotel = await models.Hotel.findByPk(review.hotel_id);
    const reviews = await hotel.getReviews(); // Lấy tất cả reviews của khách sạn

    if (reviews.length > 0) {
        // Tính toán lại rating trung bình nếu còn bình luận
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRating / reviews.length;
        await hotel.update({ rating: averageRating });
    } else {
        // Nếu không còn bình luận nào thì đặt rating là null hoặc giá trị mặc định
        await hotel.update({ rating: null });
    }
});

export default Review;
