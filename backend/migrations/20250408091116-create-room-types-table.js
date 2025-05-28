'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('room_types', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        images: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        price: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: false,
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        area: {
            type: Sequelize.DECIMAL(4, 1),
            allowNull: false,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('room_types');
}
