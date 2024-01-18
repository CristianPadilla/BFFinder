import axios from 'axios';
// import { authToken } from '.';



export const petApi = axios.create({
    baseURL: 'http://localhost:9090/pet',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
    },
});