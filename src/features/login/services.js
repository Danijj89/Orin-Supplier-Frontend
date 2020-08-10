import { AXIOS_REQUEST_CONFIG } from '../../constants.js';
import axios from 'axios';

const signIn = async (data) => {
    const configs = {
        method: 'post',
        url: '/login',
        data: data,
        headers: {
            'content-type': 'application/json'
        },
        ...AXIOS_REQUEST_CONFIG
    }
    try {
        const { data } = await axios(configs);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default {
    signIn
}