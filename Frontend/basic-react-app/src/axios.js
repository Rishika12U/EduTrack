import axios from 'axios';

const API = axios.create({
  baseURL: 'https://edutrackbackend-vguf.onrender.com', // change in production
  withCredentials: false,
});

export default API;

