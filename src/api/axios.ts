import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

// Log para depuración en la consola del navegador
console.log('API Base URL cargada:', rawBaseURL);

const formattedBaseURL =
    rawBaseURL.startsWith('http://') || rawBaseURL.startsWith('https://')
        ? rawBaseURL
        : `https://${rawBaseURL}`;

const api = axios.create({
    baseURL: formattedBaseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;