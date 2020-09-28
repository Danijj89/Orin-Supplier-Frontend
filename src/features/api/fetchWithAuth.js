import { AXIOS_REQUEST_CONFIG, ERRORS } from '../../constants.js';
import axios from 'axios';

export const fetchWithAuth = async configs => {
    let newConfigs = {
        ...configs,
        ...AXIOS_REQUEST_CONFIG,
        withCredentials: true
    };
    try {
        return await axios(newConfigs);
    } catch (error) {
        const { status, data } = error.response;
        if (status === 403) {
            sessionStorage.clear();
            window.location.replace('/login');
        }
        else {
            const errorCode = data.errorCode ? data.errorCode : 'DEFAULT';
            error.response.data.message = ERRORS[errorCode];
            return Promise.reject(error);
        }
    }
}