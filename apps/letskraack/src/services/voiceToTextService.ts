import axios from "axios"

export const getToken = async () => {
    const response = await axios.get('/api/voice-to-text');
    return response.data?.token as string;
}