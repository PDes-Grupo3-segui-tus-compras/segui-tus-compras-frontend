import axios from './axios';

export const fetchMetrics = async () => {
    const response = await axios.get('/metrics');
    return response.data;
};
