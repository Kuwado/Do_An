'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('predicts', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        predicted_guests: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        actual_guests: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('predicts');
}
