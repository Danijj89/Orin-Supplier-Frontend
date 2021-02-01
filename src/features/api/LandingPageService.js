import { AXIOS_REQUEST_CONFIG, BACKEND_ERRORS } from '../../app/utils/constants.js';
import axios from 'axios';


export const sendContactInfo = async (contact) => {
    const configs = {
        method: 'post',
        url: 'app/contact',
        data: contact,
        AXIOS_REQUEST_CONFIG,
        withCredentials: true
    };
    try {
        return await axios(configs);
    } catch (error) {
        const { data } = error.response;

        const errorCode = data.errorCode ? data.errorCode : 'DEFAULT';
        error.response.data.message = BACKEND_ERRORS[errorCode];
        return Promise.reject(error);
    }
};

const LandingPageService = {
    sendContactInfo,
};

export default LandingPageService;

