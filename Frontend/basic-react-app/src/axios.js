
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://edutrack-backend.onrender.com/api',
   withCredentials: true,
});

export default API;

