import { AXIOS_REQUEST_CONFIG } from '../../constants.js';
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
        const { status } = error.response;
        if (status === 403) {
            sessionStorage.clear();
            window.location.replace('/login');
        }
        else {
            return Promise.reject(error);
        }
    }
}
