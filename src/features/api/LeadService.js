import { fetchWithAuth } from './utils.js';

const fetchLeads = async () => {
    const configs = {
        method: 'get',
        url: 'leads'
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

const createLeadAddress = async (leadId, address) => {
    const configs = {
        method: 'post',
        url: `leads/${leadId}/addresses`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteLeadAddress = async (leadId, addressId) => {
    const configs = {
        method: 'delete',
        url: `leads/${leadId}/addresses/${addressId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateLeadDefaultAddress = async (leadId, addressId) => {
    const configs = {
        method: 'put',
        url: `leads/${leadId}/addresses/${addressId}/default`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateLeadAddress = async (leadId, addressId, update) => {
    const configs = {
        method: 'put',
        url: `leads/${leadId}/addresses/${addressId}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteLead = async (leadId) => {
    const configs = {
        method: 'delete',
        url: `leads/${leadId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const convertLeadToClient = async (leadId, userId) => {
    const configs = {
        method: 'put',
        url: `leads/${leadId}/convert`,
        data: { userId }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchAllLeads = async () => {
    const configs = {
        method: 'get',
        url: 'leads/all'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const LeadService = {
    fetchLeads,
    createLead,
    updateLead,
    createLeadAddress,
    deleteLeadAddress,
    updateLeadDefaultAddress,
    updateLeadAddress,
    deleteLead,
    convertLeadToClient,
    fetchAllLeads
};

export default LeadService;