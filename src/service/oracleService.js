import axios from "@/service/axios";

export const fetchTheAnswerToEverything = async () => {
    return await axios.get('/answer');
};
