import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Hotel extends Model {
    // Đây là phương thức static dùng để khai báo quan hệ giữa các bảng (nếu có)
    static associate(models) {
        // Ví dụ: Hotel.hasMany(models.Room); Nếu bạn có quan hệ với bảng Room
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
