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

const createLead = async (lead) => {
    const configs = {
        method: 'post',
        url: 'leads',
        data: lead
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};



const LeadService = {
    fetchLeads,
    createLead
};

export default LeadService;