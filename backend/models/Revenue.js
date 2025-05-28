import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Revenue extends Model {
    static associate(models) {
        Revenue.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });
    }
}

Revenue.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        revenue: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
            defaultValue: 0,
        },
        report_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('daily', 'monthly', 'yearly'),
            allowNull: false,
            defaultValue: 'daily',
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'revenues',
        modelName: 'Revenue',
        timestamps: false,
    },
);

export default Revenue;
