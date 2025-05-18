import axios from './axios';

export const purchaseProduct = async (purchaseData) => {
    const response = await axios.post('/purchase', purchaseData);
    return response.data;
};

export const favouriteProduct = async (productData) => {
    const response = await axios.put('/products/favourite', productData);
    return response.data;
};

export const getProductDataToSend = (product) => {
    return {
        catalog_product_id: product.catalog_product_id,
        name: product.name,
        image: product.pictures[0].url,
        short_description: product.short_description,
        price: product.price
    };
};
