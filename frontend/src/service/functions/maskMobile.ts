export const maskMobile = (value: string) => {
    value = value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{1})(\d{0,4})/, '($1) $2 $3');
    } else if (value.length > 0) {
        value = value.replace(/^(\d{2})(\d{0,1})/, '($1) $2');
    }

    return value;
};