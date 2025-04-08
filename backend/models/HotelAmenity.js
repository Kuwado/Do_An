import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class HotelAmenity extends Model {
    static associate(models) {
        HotelAmenity.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });

        HotelAmenity.belongsTo(models.Amenity, {
            foreignKey: 'amenity_id',
            as: 'amenity',
        });
    }
}

HotelAmenity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id',
            },
        },
        amenity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'amenities',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'HotelAmenity',
        tableName: 'hotel_amenities',
        timestamps: false,
    },
);

export default HotelAmenity;
