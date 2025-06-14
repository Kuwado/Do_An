import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Service extends Model {
    static associate(models) {
        Service.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });

        Service.hasMany(models.ServiceBooking, {
            foreignKey: 'service_id',
            as: 'service_bookings',
        });
    }
}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        images: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: DataTypes.ENUM('dining', 'entertainment', 'facilities'),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: false,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'services',
        timestamps: false,
    },
);

export default Service;
