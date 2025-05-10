import axios from './axios';

export const purchaseProduct = async (purchaseData) => {
    const response = await axios.post('/purchase', purchaseData);
    return response.data;
};

export const favouriteProduct = async (productData) => {
    const response = await axios.put('/products/favourite', productData);
    return response.data;
};
