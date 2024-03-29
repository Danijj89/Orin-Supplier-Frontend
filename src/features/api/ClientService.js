import { fetchWithAuth } from './utils.js';

const fetchClients = async () => {
    const configs = {
        method: 'get',
        url: 'clients'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createClient = async (client) => {
    const configs = {
        method: 'post',
        url: 'clients',
        data: client
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchClientById = async (id) => {
    const configs = {
        method: 'get',
        url: `clients/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateClient = async (id, update) => {
    const configs = {
        method: 'put',
        url: `clients/${id}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createClientAddress = async (clientId, address) => {
    const configs = {
        method: 'post',
        url: `clients/${clientId}/addresses`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteClientAddress = async (clientId, addressId) => {
    const configs = {
        method: 'delete',
        url: `clients/${clientId}/addresses/${addressId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateDefaultClientAddress = async (clientId, addressId) => {
    const configs = {
        method: 'put',
        url: `clients/${clientId}/addresses/${addressId}/default`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateAddress = async (clientId, addressId, update) => {
    const configs = {
        method: 'put',
        url: `clients/${clientId}/addresses/${addressId}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createClientContact = async (clientId, contact) => {
    const configs = {
        method: 'post',
        url: `clients/${clientId}/contacts`,
        data: contact
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteContact = async (clientId, contactId) => {
    const configs = {
        method: 'delete',
        url: `clients/${clientId}/contacts/${contactId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateContact = async (clientId, contactId, update) => {
    const configs = {
        method: 'put',
        url: `clients/${clientId}/contacts/${contactId}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteClient = async (clientId) => {
    const configs = {
        method: 'delete',
        url: `clients/${clientId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateDefaultClientContact = async (clientId, contactId) => {
    const configs = {
        method: 'put',
        url: `clients/${clientId}/contacts/${contactId}/default`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ClientService = {
    fetchClients,
    createClient,
    fetchClientById,
    updateClient,
    createClientAddress,
    deleteClientAddress,
    updateDefaultClientAddress,
    updateAddress,
    createClientContact,
    deleteContact,
    updateContact,
    deleteClient,
    updateDefaultClientContact
};

export default ClientService;