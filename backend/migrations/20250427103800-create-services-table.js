'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        category: {
            type: Sequelize.ENUM('dining', 'entertainment', 'facilities'),
            allowNull: false,
        },
        price: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: false,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
}
