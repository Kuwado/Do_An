import cron from 'node-cron';
import models from '../models/index.js';
import { Op } from 'sequelize';

// =========================
// Hàm cập nhật doanh thu
// =========================
async function updateRevenue() {
    try {
        const hotels = await models.Hotel.findAll();
        const now = new Date();

        for (const hotel of hotels) {
            const hotelId = hotel.id;

            // === DAILY: hôm qua ===
            const dailyDate = new Date(now);
            dailyDate.setDate(now.getDate() - 1);
            const dailyDateString = dailyDate.toISOString().split('T')[0];

            const dailyRevenue = await calculateRevenueByDate(
                hotelId,
                dailyDateString,
            );
            await models.Revenue.create({
                hotel_id: hotelId,
                revenue: dailyRevenue,
                report_date: dailyDateString,
                type: 'daily',
                created_at: new Date(),
                updated_at: new Date(),
            });

            // === MONTHLY: tháng trước ===
            const monthlyDate = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1,
            );
            const monthlyDateString = monthlyDate.toISOString().split('T')[0];

            const monthlyRevenue = await calculateRevenueByMonth(
                hotelId,
                monthlyDate,
            );
            await upsertRevenueRecord(
                hotelId,
                monthlyRevenue,
                monthlyDateString,
                'monthly',
            );

            // === YEARLY: năm trước ===
            const yearlyDate = new Date(now.getFullYear() - 1, 0, 1);
            const yearlyDateString = yearlyDate.toISOString().split('T')[0];

            const yearlyRevenue = await calculateRevenueByYear(
                hotelId,
                yearlyDate.getFullYear(),
            );
            await upsertRevenueRecord(
                hotelId,
                yearlyRevenue,
                yearlyDateString,
                'yearly',
            );
        }

        console.log(
            '✅ Revenue update completed at',
            new Date().toLocaleString('vi-VN'),
        );
    } catch (error) {
        console.error('❌ Error updating revenue:', error);
    }
}

// =========================
// Tính doanh thu ngày
// =========================
async function calculateRevenueByDate(hotelId, dateString) {
    const start = new Date(`${dateString}T00:00:00.000Z`);
    const end = new Date(`${dateString}T23:59:59.999Z`);

    const bookings = await models.Booking.findAll({
        where: {
            hotel_id: hotelId,
            status: {
                [Op.in]: ['confirmed', 'completed'],
            },
            check_out: {
                [Op.gte]: start,
                [Op.lte]: end,
            },
        },
    });

    return bookings.reduce((sum, b) => sum + Number(b.paid_amount || 0), 0);
}

// =========================
// Tính doanh thu tháng
// =========================
async function calculateRevenueByMonth(hotelId, monthDate) {
    const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const end = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
    );

    const bookings = await models.Booking.findAll({
        where: {
            hotel_id: hotelId,
            status: {
                [Op.in]: ['confirmed', 'completed'],
            },
            check_out: {
                [Op.gte]: start,
                [Op.lte]: end,
            },
        },
    });

    return bookings.reduce((sum, b) => sum + Number(b.paid_amount || 0), 0);
}

// =========================
// Tính doanh thu năm
// =========================
async function calculateRevenueByYear(hotelId, year) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);

    const bookings = await models.Booking.findAll({
        where: {
            hotel_id: hotelId,
            status: {
                [Op.in]: ['confirmed', 'completed'],
            },
            check_out: {
                [Op.gte]: start,
                [Op.lte]: end,
            },
        },
    });

    return bookings.reduce((sum, b) => sum + Number(b.paid_amount || 0), 0);
}

// =========================
// Hàm tạo hoặc cập nhật revenue
// =========================
async function upsertRevenueRecord(hotelId, revenue, reportDate, type) {
    let whereClause = {
        hotel_id: hotelId,
        type,
    };

    const date = new Date(reportDate);

    if (type === 'monthly') {
        const month = date.getMonth() + 1; // JS month: 0-11
        const year = date.getFullYear();

        whereClause = {
            ...whereClause,
            [Op.and]: [
                where(fn('MONTH', col('report_date')), month),
                where(fn('YEAR', col('report_date')), year),
            ],
        };
    } else if (type === 'yearly') {
        const year = date.getFullYear();

        whereClause = {
            ...whereClause,
            [Op.and]: [where(fn('YEAR', col('report_date')), year)],
        };
    } else {
        whereClause.report_date = reportDate; // full date for daily
    }

    const existing = await models.Revenue.findOne({ where: whereClause });

    if (existing) {
        existing.revenue = revenue;
        existing.updated_at = new Date();
        await existing.save();
    } else {
        await models.Revenue.create({
            hotel_id: hotelId,
            revenue,
            report_date: reportDate,
            type,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }
}

// =========================
// Cron Job - chạy lúc 2h sáng mỗi ngày
// =========================
export const updateHotelRevenue = () => {
    // Chạy mỗi ngày lúc 00:10 sáng
    cron.schedule(
        '0 2 * * *',
        () => {
            console.log('🕑 Running revenue update job...');
            updateRevenue();
        },
        {
            scheduled: true,
            timezone: 'Asia/Ho_Chi_Minh',
        },
    );
};
