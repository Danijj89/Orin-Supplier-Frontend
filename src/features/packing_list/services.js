import { fetchWithAuth } from '../shared/fetchWithAuth.js';

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
        url: `/file/generate/pl`,
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
    deletePL
};

export default PLService;