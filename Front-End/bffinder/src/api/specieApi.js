import axios from 'axios';
import { authToken } from '.';



export const specieApi = axios.create({
    baseURL: 'http://localhost:9090/specie',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});