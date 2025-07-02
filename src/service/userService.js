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

export const fetchUserProfileById = async (id) =>{
    const response = await axios.get(`/profile/${id}`);
    return response.data.user;
};

export const updatePassword = async(passwordData) =>{
    const response = await axios.post('/change-password', passwordData);
    return response
}