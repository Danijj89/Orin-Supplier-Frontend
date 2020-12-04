import { fetchWithAuth } from './utils.js';

const fetchLeads = async (companyId) => {
    const configs = {
        method: 'get',
        url: 'leads',
        params: {
            company: companyId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const LeadService = {
    fetchLeads
};

export default LeadService;