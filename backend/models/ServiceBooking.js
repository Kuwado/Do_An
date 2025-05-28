import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import models from './index.js';

class ServiceBooking extends Model {
    static associate(models) {
        ServiceBooking.belongsTo(models.Booking, {
            foreignKey: 'booking_id',
            as: 'booking',
        });

        ServiceBooking.belongsTo(models.Service, {
            foreignKey: 'service_id',
            as: 'service',
        });

        ServiceBooking.belongsTo(models.Voucher, {
            foreignKey: 'voucher_id',
            as: 'voucher',
        });
    }
}

ServiceBooking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        voucher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        final_amount: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
            defaultValue: 'pending',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
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
        modelName: 'ServiceBooking',
        tableName: 'service_bookings',
        timestamps: false,

        hooks: {
            async beforeCreate(serviceBooking) {
                // Lấy giá dịch vụ nếu chưa có
                if (!serviceBooking.price) {
                    const service = await models.Service.findByPk(
                        serviceBooking.service_id,
                    );
                    if (service) {
                        serviceBooking.price = service.price;
                    }
                }

                // Tính final_amount
                const price = parseFloat(serviceBooking.price || 0);
                const quantity = parseInt(serviceBooking.quantity || 1);
                serviceBooking.total_amount = price * quantity;

                if (serviceBooking.voucher_id) {
                    const voucher = await models.Voucher.findByPk(
                        serviceBooking.voucher_id,
                    );
                    if (voucher.discount_type === 'percent') {
                        serviceBooking.final_amount = Math.round(
                            (serviceBooking.total_amount *
                                (100 - voucher.discount)) /
                                100,
                        );
                    } else if (voucher.discount_type === 'fixed') {
                        serviceBooking.final_amount =
                            serviceBooking.total_amount - voucher.discount;
                    }
                } else {
                    serviceBooking.final_amount = serviceBooking.total_amount;
                }
            },

            async beforeUpdate(serviceBooking) {
                if (
                    serviceBooking.changed('price') ||
                    serviceBooking.changed('quantity')
                ) {
                    const price = parseFloat(serviceBooking.price || 0);
                    const quantity = parseInt(serviceBooking.quantity || 1);
                    serviceBooking.final_amount = price * quantity;
                }
            },

            async afterCreate(service, options) {
                await updateBookingAmount(service.booking_id);
            },

            async afterUpdate(service, options) {
                await updateBookingAmount(service.booking_id);
            },
            async afterDestroy(bookingService, options) {
                await updateBookingAmount(bookingService.booking_id);
            },
        },
    },
);

async function updateBookingAmount(bookingId) {
    const totalServiceAmount = await models.ServiceBooking.sum('final_amount', {
        where: { booking_id: bookingId, status: 'confirmed' },
    });

    const booking = await models.Booking.findByPk(bookingId);

    booking.service_amount = totalServiceAmount;
    booking.total_amount =
        parseFloat(booking.room_amount || 0) + totalServiceAmount;
    await booking.save();
}

export default ServiceBooking;
