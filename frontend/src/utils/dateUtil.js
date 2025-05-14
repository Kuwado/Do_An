export const getDate = (offsetDays = 0) => {
    const now = new Date();
    // Cộng thêm 7 tiếng (7 * 60 * 60 * 1000 ms)
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
    now.setDate(now.getDate() + offsetDays);
    return now.toISOString().split('T')[0];
};

export const getDefaultDate = (checkIn) => {
    const today = new Date();
    today.setTime(today.getTime() + 7 * 60 * 60 * 1000);

    const checkInDate = new Date(checkIn);
    const defaultDate = today < checkInDate ? checkInDate : today;
    return defaultDate.toISOString().split('T')[0];
};

export const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export const changeToDate = (stringDate) => {
    const date = new Date(stringDate);
    return date.toISOString().split('T')[0];
};

export const getDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Đặt thời gian về 00:00:00 để tránh sai lệch do giờ
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffTime = end - start;

    return Math.floor(diffTime / millisecondsPerDay);
};

export const formatTimeMinuteAndSecond = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const formatTimeMinute = (seconds) => {
    const m = Math.floor(seconds / 60);
    return `${m.toString().padStart(2, '0')}`;
};

export const formatTimeSecond = (seconds) => {
    const s = seconds % 60;
    return `${s.toString().padStart(2, '0')}`;
};
