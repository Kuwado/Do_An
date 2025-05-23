'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('rooms', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        room_number: {
            type: Sequelize.STRING(10),
            allowNull: false,
            unique: true,
        },
        status: {
            type: Sequelize.ENUM('active', 'maintenance'),
            allowNull: false,
            defaultValue: 'active',
        },
        room_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'room_types',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rooms');
}
