import { AXIOS_REQUEST_CONFIG } from '../../constants.js';
import axios from 'axios';

export const fetchWithAuth = async configs => {
    const token = sessionStorage.getItem('token');

    let newConfigs = {
        ...configs,
        ...AXIOS_REQUEST_CONFIG
    };
    if (!newConfigs.headers) newConfigs.headers = {};
    newConfigs.headers['Authorization'] = `Bearer ${token}`;
    try {
        const { data } = await axios(newConfigs);
        return data;
    } catch (error) {
        const { status } = error.response;
        if (status === 403) {
            sessionStorage.clear();
            window.location.replace('/login');
        }
        else{
            console.log(error);
            return Promise.reject(error);
        }
    }
}
