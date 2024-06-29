export function validateCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digitoVerificador = 11 - (soma % 11);
    if (digitoVerificador > 9) {
        digitoVerificador = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digitoVerificador) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digitoVerificador = 11 - (soma % 11);
    if (digitoVerificador > 9) {
        digitoVerificador = 0;
    }
    if (parseInt(cpf.charAt(10)) !== digitoVerificador) {
        return false;
    }

    return true;
}
