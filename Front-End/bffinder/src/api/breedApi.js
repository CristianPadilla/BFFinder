import axios from 'axios';
// import { authToken } from '.';



export const breedApi = axios.create({
    baseURL: 'http://localhost:9090/breed',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
    },
});