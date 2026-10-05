import axios from 'axios';

// Obtener la URL de entorno
const rawBaseURL = import.meta.env.API_URL || 'http://localhost:4000/api/v1';

// Asegurar que comience con http:// o https:// si no estamos en localhost
const formattedBaseURL =
    rawBaseURL.startsWith('http://') || rawBaseURL.startsWith('https://')
        ? rawBaseURL
        : `https://${rawBaseURL}`;

const api = axios.create({
    baseURL: formattedBaseURL,
});

// Interceptor para inyectar automáticamente el JWT si existe
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;