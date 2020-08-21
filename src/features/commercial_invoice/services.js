import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchCIOptions = async (companyId) => {
    const configs = {
        method: 'get',
        url: `/companies/${companyId}/document_autocomplete/ci`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const generateCIFiles = async (ci) => {
    const configs = {
        method: 'post',
        responseType: 'blob',
        url: `/file/generate/ci`,
        data: ci
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const createNewCI = async (ci) => {
    const configs = {
        method: 'post',
        url: `/ci`,
        data: ci
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const CIService =  {
    fetchCIOptions,
    generateCIFiles,
    createNewCI
};

export default CIService;