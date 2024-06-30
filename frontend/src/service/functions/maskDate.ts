export const maskDate = (value: string) => {
    value = value.replace(/\D/g, '');

    if (value.length > 4) {
        value = value.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{2}).*/, '$1/$2');
    }

    return value;
};