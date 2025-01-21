import CryptoJS from 'crypto-js';

const clave_secreta = "ABC";

function cifrar(valor,indice)
{
    const encryptedToken = CryptoJS.AES.encrypt(valor, clave_secreta).toString();
    localStorage.setItem(indice, encryptedToken);
}

function descifrar(indice)
{
    const criptado = localStorage.getItem(indice);
    const bytes = CryptoJS.AES.decrypt(criptado, clave_secreta);
    const descifrado = bytes.toString(CryptoJS.enc.Utf8);
    console.log(descifrado)
    return descifrado;
}

export { cifrar, descifrar };