import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; //TODO: Para produccion pasarlo a un .env

function getAuthToken() {
    return localStorage.getItem('token');
}

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
