'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        room_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'rooms',
                key: 'id',
            },
            onDelete: 'CASCADE',
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
        check_in: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        check_out: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        room_price: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: true,
        },
        total_room_price: {
            type: Sequelize.DECIMAL(10, 0),
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
        room_amount: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: true,
        },
        service_amount: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: true,
            defaultValue: 0,
        },
        total_amount: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: true,
        },
        paid_amount: {
            type: Sequelize.DECIMAL(10, 0),
            allowNull: true,
            defaultValue: 0,
        },
        status: {
            type: Sequelize.ENUM(
                'pending',
                'confirmed',
                'expired',
                'cancelled',
                'completed',
            ),
            allowNull: false,
            defaultValue: 'pending',
        },
        expired_at: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
}
