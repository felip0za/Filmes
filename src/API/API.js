import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // ou o endereço correto do seu backend
});

export default api;