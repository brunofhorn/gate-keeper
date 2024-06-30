export const validateDate = (value: string): string | boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = value.match(regex);
    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1;
    const year = parseInt(match[3], 10);

    const date = new Date(year, month, day);
    const isValidDate = date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;

    if (!isValidDate) return false;

    const formattedDate = `${year.toString().padStart(4, '0')}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
};