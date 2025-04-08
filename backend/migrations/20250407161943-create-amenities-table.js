'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('amenities', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        category: {
            type: Sequelize.ENUM('bathroom', 'view', 'general'),
            allowNull: false,
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('amenities');
}
