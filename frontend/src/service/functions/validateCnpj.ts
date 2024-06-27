export function validateCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj.length !== 14) {
        return false;
    }

    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    let soma = 0;
    let peso = 2;

    for (let i = 11; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
    }

    let digitoVerificador = (soma % 11 < 2 ? 0 : 11 - (soma % 11)).toString();

    if (cnpj.charAt(12) !== digitoVerificador) {
        return false;
    }

    soma = 0;
    peso = 2;

    for (let i = 12; i >= 0; i--) {
        soma += parseInt(cnpj.charAt(i)) * peso;
        peso = peso === 9 ? 2 : peso + 1;
    }

    digitoVerificador = (soma % 11 < 2 ? 0 : 11 - (soma % 11)).toString();

    if (cnpj.charAt(13) !== digitoVerificador) {
        return false;
    }

    return true;
}
