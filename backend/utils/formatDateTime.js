/**
 * Trả về thời gian check-in là 14:00 tại múi giờ Việt Nam (GMT+7)
 * @param {string|Date} dateStr - ngày check-in dạng ISO hoặc Date
 * @returns {Date} - Thời gian UTC tương ứng với 14:00 giờ VN
 */
export const formatCheckIn = (dateStr) => {
    const date = new Date(dateStr);
    date.setUTCHours(7); // 14h VN = 7h UTC
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date;
};

/**
 * Trả về thời gian check-out là 12:00 tại múi giờ Việt Nam (GMT+7)
 * @param {string|Date} dateStr - ngày check-out dạng ISO hoặc Date
 * @returns {Date} - Thời gian UTC tương ứng với 12:00 giờ VN
 */
export const formatCheckOut = (dateStr) => {
    const date = new Date(dateStr);
    date.setUTCHours(5); // 12h VN = 5h UTC
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date;
};
