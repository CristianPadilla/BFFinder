import axios from 'axios';
import { authToken } from '.';



export const locationApi = axios.create({
    baseURL: 'http://localhost:9090/location',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});