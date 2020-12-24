import { AXIOS_REQUEST_CONFIG } from '../../app/utils/constants.js';
import axios from 'axios';

const signIn = async (data) => {
    const configs = {
        method: 'post',
        url: 'app/login',
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

const AppService = {
    signIn
};

export default AppService;
