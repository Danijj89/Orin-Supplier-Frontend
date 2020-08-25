import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchPLOptions = async (companyId) => {
    const configs = {
        method: 'get',
        url: `/companies/${companyId}/document_autocomplete/pl`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const PLService = {
    fetchPLOptions
};

export default PLService;