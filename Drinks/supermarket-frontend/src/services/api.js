// src/api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://supermarketapi-nada.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // helps with Render cold starts
});

// Automatically attach Bearer token if user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;