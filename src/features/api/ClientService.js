import { fetchWithAuth } from './fetchWithAuth.js';

const fetchClients = async (id) => {
    const configs = {
        method: 'get',
        url: 'clients',
        params: {
            company: id
        }
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

const ClientService = {
    fetchClients,
    createClient,
    fetchClientById,
    updateClient
};

export default ClientService;