import { ENGLISH } from './languages/english';

// The language package used for the application
export const LANGUAGE = ENGLISH;

const LOCAL_SERVER_URI = 'http://localhost:5000/api';
const SERVER_URI = LOCAL_SERVER_URI;

export const AXIOS_REQUEST_CONFIG = {
    baseURL: SERVER_URI
};

