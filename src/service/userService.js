import axios from './axios';

export const fetchUsers = async () => {
    const response = await axios.get('/users');
    return response.data;
};
