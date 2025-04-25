'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('hotels', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        avatar: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        images: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING(255),
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
        min_price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },
        rating: {
            type: Sequelize.FLOAT,
            allowNull: true,
            validate: {
                min: 0,
                max: 5,
            },
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hotels');
}
