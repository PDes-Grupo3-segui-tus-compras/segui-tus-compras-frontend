import axios from './axios';

export const login = async (credentials) => {
    const response = await axios.post('/login', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await axios.post('/register', userData);
    return response.data;
};

export const logout = (token) => {
    axios.post('/logout', null, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
