import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';
import Hotel from './Hotel.js';

class Staff extends Model {
    static associate(models) {
        Staff.belongsTo(models.Hotel, { foreignKey: 'hotel_id', as: 'hotel' });
    }

    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

Staff.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.TEXT,
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
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('staff', 'admin'),
            allowNull: false,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'hotels',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'staffs',
        modelName: 'Staff',
        timestamps: false,
        scopes: {
            admin: {
                where: { role: 'admin' },
            },
            staff: {
                where: { role: 'staff' },
            },
        },
    },
);

Staff.beforeCreate(async (staff, options) => {
    if (staff.password) {
        staff.password = await Staff.hashPassword(staff.password);
    }
});

Staff.beforeUpdate(async (staff, options) => {
    if (staff.password) {
        staff.password = await Staff.hashPassword(staff.password);
    }
});

export default Staff;
