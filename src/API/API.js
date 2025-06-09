import axios from 'axios';

const api = axios.create({
  baseURL: 'https://filmes-api-2.onrender.com/', // ou o endereço correto do seu backend
});

export default api;