import { Model, DataTypes, fn, col, literal } from 'sequelize';
import sequelize from '../config/db.js';

class RoomType extends Model {
    static associate(models) {
        RoomType.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });

        RoomType.hasMany(models.Room, {
            foreignKey: 'room_type_id',
            as: 'rooms',
        });
    }
}

RoomType.init(
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
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        area: {
            type: DataTypes.DECIMAL(4, 1),
            allowNull: false,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'RoomType',
        tableName: 'room_types',
        timestamps: false,
        scopes: {
            roomCount: {
                include: [
                    {
                        model: sequelize.models.Room,
                        as: 'rooms',
                        attributes: [],
                    },
                ],
                attributes: {
                    include: [
                        [fn('COUNT', col('rooms.id')), 'total_rooms'],
                        [
                            fn(
                                'SUM',
                                literal(
                                    `CASE WHEN rooms.status = 'available' THEN 1 ELSE 0 END`,
                                ),
                            ),
                            'available_rooms',
                        ],
                    ],
                },
                group: ['RoomType.id'],
            },
        },
    },
);

export default RoomType;
