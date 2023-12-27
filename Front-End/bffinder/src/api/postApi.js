import axios from 'axios';

const authToken =
"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YWthbmRhQG1haWwuY29tIiwiaWF0IjoxNzAzNjI5NTk3LCJleHAiOjE3MDM3MTU5OTd9.3VpqGWNqM3zAHDUPmZHTi3AF1-LPg1txVQIw8gdf7XI";


export const postApi = axios.create({
    baseURL: 'http://localhost:9090/post', // Replace with your API base URL
    // timeout: 5000, // Set a timeout value in milliseconds
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
    },
});

