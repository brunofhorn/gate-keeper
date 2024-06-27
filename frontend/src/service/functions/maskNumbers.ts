export const maskNumbers = (value: string) => {
    if (/^\d*$/.test(value)) {
        return value;
    } else {
        return value.slice(0, -1);
    }
};