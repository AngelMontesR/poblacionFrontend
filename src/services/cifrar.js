import CryptoJS from 'crypto-js';

const clave_secreta = "ABC";

function cifrar(valor)
{
    const encryptedToken = CryptoJS.AES.encrypt(valor, clave_secreta).toString();
    localStorage.setItem('token', encryptedToken);
}

function descifrar(valor)
{
    const encryptedToken = localStorage.getItem(valor);
    const bytes = CryptoJS.AES.decrypt(encryptedToken, clave_secreta);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
}

export { cifrar, descifrar };