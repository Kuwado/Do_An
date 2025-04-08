// models/Voucher.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Voucher extends Model {
    static associate(models) {
        Voucher.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });
    }
}

Voucher.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('room', 'service'),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        discount_type: {
            type: DataTypes.ENUM('percent', 'fixed'),
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        usage_limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        used_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
    },
    {
        sequelize,
        modelName: 'Voucher',
        tableName: 'vouchers',
        timestamps: false,
    },
);

export default Voucher;
