export const removeTones = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/ô/g, 'o')
        .replace(/Ô/g, 'O')
        .replace(/ơ/g, 'o')
        .replace(/Ơ/g, 'O')
        .replace(/ê/g, 'e')
        .replace(/Ê/g, 'E');
};

export const formatPrice = (amount) => {
    if (isNaN(amount)) return '0 VND';
    return `${Number(amount).toLocaleString('vi-VN')} VND`;
};
