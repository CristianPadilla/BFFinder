import axios from 'axios';
import { authToken } from '.';

export const userApi = axios.create({
    baseURL: 'http://localhost:9090/user', 
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});