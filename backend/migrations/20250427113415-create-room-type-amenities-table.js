'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('room_type_amenities', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        room_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'room_types',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        amenity_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'amenities',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('room_type_amenities');
}
