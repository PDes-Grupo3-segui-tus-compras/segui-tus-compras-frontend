import axios from './axios';

export const fetchUsers = async () => {
    const response = await axios.get('/users');
    return response.data;
};

export const fetchUserFavourites = async (id) => {
    const response = await axios.get(`/users/${id}/favourites`);
    return response.data;
};

export const fetchUserPurchases = async (id) => {
    const response = await axios.get(`/users/${id}/purchases`);
    return response.data;
};
