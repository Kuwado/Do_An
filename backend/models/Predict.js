import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Predict extends Model {
    static associate(models) {
        Predict.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });
    }
}

Predict.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        predicted_guests: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        actual_guests: {
            type: DataTypes.INTEGER,
            allowNull: true, // Có thể null nếu chưa có dữ liệu thực tế
        },
    },
    {
        sequelize,
        tableName: 'predicts',
        modelName: 'Predict',
        timestamps: false,
    },
);

export default Predict;
