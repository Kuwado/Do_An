'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
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
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
}
