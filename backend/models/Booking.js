// models/Booking.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { differenceInDays } from 'date-fns';
import models from './index.js';

class Booking extends Model {
    static associate(models) {
        Booking.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });

        Booking.belongsTo(models.Room, {
            foreignKey: 'room_id',
            as: 'room',
        });

        Booking.belongsTo(models.Hotel, {
            foreignKey: 'hotel_id',
            as: 'hotel',
        });

        Booking.belongsTo(models.Voucher, {
            foreignKey: 'voucher_id',
            as: 'voucher',
        });

        //
        Booking.hasMany(models.ServiceBooking, {
            foreignKey: 'booking_id',
            as: 'service_bookings',
        });
    }
}

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hotel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        check_in: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        room_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        total_room_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        voucher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        room_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        service_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        paid_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM(
                'pending',
                'expired',
                'confirmed',
                'cancelled',
                'completed',
            ),
            defaultValue: 'pending',
        },
        expired_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Booking',
        tableName: 'bookings',
        timestamps: false,

        hooks: {
            async beforeCreate(booking, options) {
                const checkIn = new Date(booking.check_in);
                const checkOut = new Date(booking.check_out);

                const numDays = differenceInDays(checkOut, checkIn) + 1;
                booking.total_room_price =
                    parseFloat(booking.room_price) * numDays;

                booking.room_amount = booking.total_room_price;

                if (booking.voucher_id) {
                    const voucher = await models.Voucher.findByPk(
                        booking.voucher_id,
                    );
                    if (voucher.discount_type === 'percent') {
                        booking.room_amount = Math.round(
                            (booking.room_amount * (100 - voucher.discount)) /
                                100,
                        );
                    } else if (voucher.discount_type === 'fixed') {
                        booking.room_amount =
                            booking.room_amount - voucher.discount;
                    }
                }

                // Tính lại tổng nếu cần:
                booking.total_amount =
                    parseFloat(booking.room_amount) +
                    parseFloat(booking.service_amount || 0);

                const now = new Date();
                booking.expired_at = new Date().getTime() + 30 * 60 * 1000;
            },

            async beforeUpdate(booking, options) {
                if (
                    booking.changed('status') &&
                    booking.status !== 'pending' &&
                    booking.expired_at !== null
                ) {
                    booking.expired_at = null;
                }

                if (booking.voucher_id && booking.changed('voucher_id')) {
                    const voucher = await models.Voucher.findByPk(
                        booking.voucher_id,
                    );
                    if (voucher.discount_type === 'percent') {
                        booking.room_amount = Math.round(
                            (booking.room_amount * (100 - voucher.discount)) /
                                100,
                        );
                    } else if (voucher.discount_type === 'fixed') {
                        booking.room_amount =
                            booking.room_amount - voucher.discount;
                    }
                }

                if (
                    booking.changed('room_amount') ||
                    booking.changed('service_amount') ||
                    booking.changed('voucher_id')
                ) {
                    const roomAmount = parseFloat(booking.room_amount || 0);
                    const serviceAmount = parseFloat(
                        booking.service_amount || 0,
                    );
                    booking.total_amount = roomAmount + serviceAmount;
                }
            },
        },
    },
);

export default Booking;
