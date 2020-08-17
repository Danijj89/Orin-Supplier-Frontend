import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchCIOptions = async (companyId) => {
    const configs = {
        method: 'get',
        url: `/companies/${companyId}/document_autocomplete/ci`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const CIService =  {
    fetchCIOptions
};

export default CIService;