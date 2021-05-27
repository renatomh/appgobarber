import axios from 'axios';

const api = axios.create({
  // Modificar de acordo com o endereço do servidor/dispositivo utilizado (emulador Android, iOS, etc.)
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
