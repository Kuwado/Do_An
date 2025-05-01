import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Room extends Model {
    static associate(models) {
        Room.belongsTo(models.RoomType, {
            foreignKey: 'room_type_id',
            as: 'room_type',
        });
    }
}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room_number: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        room_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'room_types',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Room',
        tableName: 'rooms',
        timestamps: false,
    },
);

export default Room;
