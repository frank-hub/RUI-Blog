
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.ruiinternet.co.ke/backend/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
