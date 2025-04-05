import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; //TODO: Para produccion pasarlo a un .env

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
