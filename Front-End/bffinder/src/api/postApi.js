import axios from 'axios';
// import { authToken } from '.';


export const postApi = axios.create({
    baseURL: 'http://localhost:9090/post',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${authToken}`,
    },
});

