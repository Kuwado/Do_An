'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('revenues', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        revenue: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: false,
            defaultValue: 0,
        },
        report_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        type: {
            type: Sequelize.ENUM('daily', 'monthly', 'yearly'),
            allowNull: false,
            defaultValue: 'daily',
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('revenues');
}
