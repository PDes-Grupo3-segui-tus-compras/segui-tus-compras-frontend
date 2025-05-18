import axios from './axios';

export const publishOpinion = async (opinionData) => {
    const response = await axios.post('/opinions', opinionData);
    return response.data.data;
};

export const editOpinion = async (opinionId, opinionData) => {
    const response = await axios.put('/opinions/' + opinionId, opinionData);
    return response.data.data;
};

export const deleteOpinion = async (opinionId) => {
    const response = await axios.delete('/opinions/' + opinionId);
    return response.data;
};
