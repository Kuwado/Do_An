'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'hotels',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        images: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
}
