
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://edutrack-backend.onrender.com/api', // ✅ LIVE backend URL
});

export default API;

