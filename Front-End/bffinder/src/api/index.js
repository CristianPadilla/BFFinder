import { breedApi } from "./breedApi";
import { locationApi } from "./locationApi";
import { petApi } from "./petApi";
import { postApi } from "./postApi";
import { specieApi } from "./specieApi";


export const authToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3YWthbmRhQG1haWwuY29tIiwiaWF0IjoxNzA1NTMzNzYyLCJleHAiOjE3MDU2MjAxNjJ9.TCgCkktmCD8Sv8Yet4AztbyGDtqf_sm73SPIn8DsxBA";


export const setAuthToken = (token) => {
    const authToken = `Bearer ${token}`;
    // console.log("setAuthToken ===== ", authToken);
    specieApi.defaults.headers['Authorization'] = authToken;
    specieApi.defaults.headers.common.Authorization = authToken;
    breedApi.defaults.headers.common.Authorization = authToken;
    locationApi.defaults.headers.common.Authorization = authToken;
    petApi.defaults.headers.common.Authorization = authToken;
    postApi.defaults.headers.common.Authorization = authToken;
} 
