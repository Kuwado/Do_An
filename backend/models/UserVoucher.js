import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class UserVoucher extends Model {
    static associate(models) {
        UserVoucher.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });

        UserVoucher.belongsTo(models.Voucher, {
            foreignKey: 'voucher_id',
            as: 'voucher',
        });
    }
}

UserVoucher.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        voucher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'UserVoucher',
        tableName: 'user_vouchers',
        timestamps: false,
    },
);

export default UserVoucher;
