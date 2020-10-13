import { AXIOS_REQUEST_CONFIG } from '../../app/constants.js';
import axios from 'axios';
import { fetchWithAuth } from './utils.js';

const signIn = async (data) => {
    const configs = {
        method: 'post',
        url: '/login',
        data: data,
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true,
        ...AXIOS_REQUEST_CONFIG,
    }
    try {
        const { data } = await axios(configs);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const fetchSessionInfo = async (userId) => {
    const configs = {
        method: 'get',
        url: 'app/home',
        params: {
            user: userId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const AppService = {
    signIn,
    fetchSessionInfo
};

export default AppService;
