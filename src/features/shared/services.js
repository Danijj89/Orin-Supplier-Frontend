import { fetchWithAuth } from '../api/utils.js';

const downloadFile = async (fileName) => {
    const configs = {
        method: 'get',
        url: `/download/${fileName}`,
        responseType: 'blob',
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const SharedService = {
    downloadFile
};

export default SharedService;