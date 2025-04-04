'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('staffs', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        avatar: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        phone: {
            type: Sequelize.STRING(15),
            unique: true,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: true,
            validate: {
                isEmail: true,
            },
        },
        address: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        role: {
            type: Sequelize.ENUM('staff', 'admin'),
            allowNull: false,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'hotels',
                key: 'id',
            },
            allowNull: false,
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('staffs');
}
