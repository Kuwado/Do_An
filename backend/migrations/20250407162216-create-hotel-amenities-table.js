'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('hotel_amenities', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        amenity_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'amenities',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hotel_amenities');
}
