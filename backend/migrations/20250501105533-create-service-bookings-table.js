'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('service_bookings', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        booking_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        service_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },
        voucher_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'vouchers',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        final_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM('pending', 'confirmed', 'cancelled'),
            defaultValue: 'pending',
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });
}
export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('service_bookings');
}
