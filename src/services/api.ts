import axios from 'axios';

const api = axios.create({
  // Modificar de acordo com o endereço do servidor/dispositivo utilizado (emulador Android, iOS, etc.)
  // baseURL: 'https://10.0.2.2:3333',
  baseURL: 'https://gobarber.mhsw.com.br',
});

export default api;
