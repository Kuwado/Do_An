import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Hotel extends Model {
    static associate(models) {
        // Nhân viên
        Hotel.hasMany(models.Staff.scope('staff'), {
            foreignKey: 'hotel_id',
            as: 'staffs',
        });

        Hotel.hasMany(models.Staff.scope('admin'), {
            foreignKey: 'hotel_id',
            as: 'admins',
        });

        // Tiện nghi
        Hotel.belongsToMany(models.Amenity, {
            through: models.HotelAmenity,
            foreignKey: 'hotel_id',
            otherKey: 'amenity_id',
            as: 'amenities',
        });

        Hotel.hasMany(models.HotelAmenity, {
            foreignKey: 'hotel_id',
            as: 'hotel_amenities',
        });

        // Phòng
        Hotel.hasMany(models.RoomType, {
            foreignKey: 'hotel_id',
            as: 'room_types',
        });
    }
}

// Khởi tạo model Hotel
Hotel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        images: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(15),
            unique: true,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 5,
            },
        },
    },
    {
        sequelize,
        tableName: 'hotels',
        modelName: 'Hotel',
        timestamps: false,
    },
);

export default Hotel;
