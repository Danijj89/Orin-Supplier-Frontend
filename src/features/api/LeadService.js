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

const updateLead = async (leadId, update) => {
    const configs = {
        method: 'put',
        url: `leads/${leadId}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const LeadService = {
    fetchLeads,
    createLead,
    updateLead
};

export default LeadService;