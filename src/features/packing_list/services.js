import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchNewPLData = async (userId, companyId, orderId) => {
    const configs = {
        method: 'get',
        url: '/pl/new',
        params: {
            user: userId,
            company: companyId,
            po: orderId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const fetchPLOptions = async (companyId) => {
    const configs = {
        method: 'get',
        url: `/companies/${companyId}/document_autocomplete/pl`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const generatePLFiles = async (pl) => {
    const configs = {
        method: 'post',
        responseType: 'blob',
        url: `/file/pl`,
        data: pl
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const createNewPL = async (pl) => {
    const configs = {
        method: 'post',
        url: `/pl`,
        data: pl
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const deletePL = async (id) => {
    const configs = {
        method: 'delete',
        url: `/pl/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const PLService = {
    fetchPLOptions,
    generatePLFiles,
    createNewPL,
    deletePL,
    fetchNewPLData
};

export default PLService;