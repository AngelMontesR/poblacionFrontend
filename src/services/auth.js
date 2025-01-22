import axios from 'axios';
import { descifrar } from './cifrar';

const verificaLogin = async () => {
    const token = descifrar('token');
    console.log("topken",token);
    if (!token) {
        return false;
    }

    axios.post(`${import.meta.env.VITE_API_URL}/validar-token`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
        if (response.data.status == 200) {
            return true;
        } else {
            return false;
        }
    }).catch(() => {
      return false;
    });
};

export { verificaLogin };