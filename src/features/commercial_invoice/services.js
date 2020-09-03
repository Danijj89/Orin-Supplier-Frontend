import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchNewCIData = async (companyId, orderId) => {
    const configs = {
        method: 'get',
        url: `/companies/${companyId}/ci/new/${orderId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const generateCIFiles = async (ci) => {
    const configs = {
        method: 'post',
        responseType: 'blob',
        url: `/file/ci`,
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

const deleteCI = async (id) => {
    const configs = {
        method: 'delete',
        url: `/ci/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const fetchCIById = async (id) => {
    const configs = {
        method: 'get',
        url: `/ci/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const CIService =  {
    fetchCIOptions,
    generateCIFiles,
    createNewCI,
    deleteCI,
    fetchCIById,
    fetchNewCIData
};

export default CIService;