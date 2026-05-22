import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            // FIX: We create a NEW variable (cleanedToken) instead of trying to change the constant
            const cleanedToken = token.replace(/^"(.*)"$/, '$1'); 
            config.headers['Authorization'] = `Bearer ${cleanedToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

