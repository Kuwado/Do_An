import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class RoomTypeAmenity extends Model {
    static associate(models) {
        RoomTypeAmenity.belongsTo(models.RoomType, {
            foreignKey: 'room_type_id',
            as: 'room_type',
        });

        RoomTypeAmenity.belongsTo(models.Amenity, {
            foreignKey: 'amenity_id',
            as: 'amenity',
        });
    }
}

RoomTypeAmenity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        amenity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'amenities',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'RoomTypeAmenity',
        tableName: 'room_type_amenities',
        timestamps: false,
    },
);

export default RoomTypeAmenity;
