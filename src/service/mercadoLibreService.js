import axios from './axios';

export const searchProducts = async (searchParameters) => {
    const response = await axios.get('/search-products', {
        params: searchParameters
    });
    return response.data;
};

export const getProductById = async (searchParameters) => {
    const response = await axios.get('/products/get-product', {
        params: searchParameters
    });
    return response.data;
};
