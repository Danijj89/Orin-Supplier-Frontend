import { fetchWithAuth } from './fetchWithAuth.js';

const downloadFile = async (fileName) => {
    const configs = {
        method: 'get',
        url: `/download/${fileName}`,
        responseType: 'blob',
    };
    return await fetchWithAuth(configs);
};

const SharedService = {
    downloadFile
};

export default SharedService;