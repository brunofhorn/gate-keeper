export const maskPhone = (value: string) => {
    value = value.replace(/\D/g, '');

    if (value.length > 2 && value.length <= 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return value;
};
