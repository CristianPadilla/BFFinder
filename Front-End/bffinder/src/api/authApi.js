import axios from 'axios';
import { authToken } from '.';

export const authApi = axios.create({
    baseURL: 'http://localhost:9090/auth', 
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
    },
});