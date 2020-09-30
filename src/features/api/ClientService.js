import { fetchWithAuth } from './fetchWithAuth.js';

const fetchClients = async (id) => {
    const configs = {
        method: 'get',
        url: `clients`,
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
        url: `clients`,
        data: client
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ClientService = {
    fetchClients,
    createClient
};

export default ClientService;