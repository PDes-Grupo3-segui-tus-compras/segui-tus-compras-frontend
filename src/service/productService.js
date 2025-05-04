import axios from './axios';

export const purchaseProduct = async (purchaseData) => {
    const response = await axios.post('/purchase', purchaseData);
    return response.data;
};
