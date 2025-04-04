// models/User.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';

class User extends Model {
    static associate(models) {}

    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
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
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    },
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        timestamps: false,
    },
);

User.beforeCreate(async (user, options) => {
    if (user.password) {
        user.password = await User.hashPassword(user.password);
    }
});

User.beforeUpdate(async (user, options) => {
    if (user.password) {
        user.password = await User.hashPassword(user.password);
    }
});

export default User;
