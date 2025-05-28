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
            type: DataTypes.DECIMAL(10, 0),
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
        status: {
            type: DataTypes.ENUM('upcoming', 'active', 'end'),
            allowNull: true,
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

        hooks: {
            async afterCreate(voucher) {
                await updateStatus(voucher);
            },
            async afterUpdate(voucher) {
                await updateStatus(voucher);
            },
        },
    },
);

async function updateStatus(voucher) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset về đầu ngày

    const start = new Date(voucher.start_date);
    const end = new Date(voucher.end_date);

    let newStatus;

    if (today < start) {
        newStatus = 'upcoming';
    } else if (today > end) {
        newStatus = 'end';
    } else {
        newStatus = 'active';
    }

    if (voucher.status !== newStatus) {
        await voucher.update({ status: newStatus });
    }
}

export default Voucher;
