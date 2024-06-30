export const formatDateToBrazilian = (date: string): string => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(regex);

    if (!match) {
        throw new Error('Data inválida. Use o formato yyyy-mm-dd.');
    }

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${day}/${month}/${year}`;
};