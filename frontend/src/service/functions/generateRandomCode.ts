export const generateRandomCode = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let code = '';
    for (let i = 0; i < 3; i++) {
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));

        if (i % 2 === 0) {
            code += randomLetter;
        } else {
            code += randomNumber;
        }
    }

    code += '.';

    for (let i = 0; i < 3; i++) {
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));

        if (i % 2 === 0) {
            code += randomNumber;
        } else {
            code += randomLetter;
        }
    }

    return code;
};