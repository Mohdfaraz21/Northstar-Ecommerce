import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const persistedAuth = localStorage.getItem('authUser');

  if (persistedAuth) {
    const user = JSON.parse(persistedAuth);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  return config;
});

export default api;
