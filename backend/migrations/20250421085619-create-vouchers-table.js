'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('vouchers', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM('room', 'service'),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        discount: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: false,
        },
        discount_type: {
            type: Sequelize.ENUM('percent', 'fixed'),
            allowNull: false,
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('upcoming', 'active', 'end'),
            allowNull: true,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'hotels',
                key: 'id',
            },
            allowNull: true,
            onDelete: 'SET NULL',
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vouchers');
}
