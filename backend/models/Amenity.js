import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Amenity extends Model {
    static associate(models) {
        Amenity.belongsToMany(models.Hotel, {
            through: models.HotelAmenity,
            foreignKey: 'amenity_id',
            otherKey: 'hotel_id',
            as: 'hotels',
        });

        Amenity.hasMany(models.HotelAmenity, {
            foreignKey: 'amenity_id',
            as: 'hotel_amenities',
        });
    }
}

Amenity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        category: {
            type: DataTypes.ENUM('bathroom', 'view', 'general'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Amenity',
        tableName: 'amenities',
        timestamps: false,
    },
);

export default Amenity;
