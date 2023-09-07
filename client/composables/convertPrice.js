const numericValue = (number) => {
    return number.replace(/[^0-9]/g, '')
}

const formatInput = (number) => {
    const numericValue = String(number).replace(/[^0-9]/g, '');
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return formatter.format(Number(numericValue))
}
export{
    numericValue,
    formatInput
}