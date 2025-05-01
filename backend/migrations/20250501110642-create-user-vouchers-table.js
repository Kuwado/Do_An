'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_vouchers', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        voucher_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'vouchers',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_vouchers');
}
