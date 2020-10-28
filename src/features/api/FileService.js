import { fetchWithAuth } from './utils.js';

const downloadOrder = async (id, format) => {
    const configs = {
        method: 'get',
        url: 'download/order',
        params: {
            id,
            format
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const FileService = {
    downloadOrder
};

export default FileService;