import { fetchWithAuth } from './utils.js';


const fetchResources = async () => {
    const configs = {
        method: 'get',
        url: 'resources'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createResource = async (resource) => {
    const configs = {
        method: 'post',
        url: 'resources',
        data: resource
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const ResourceService = {
    fetchResources,
    createResource
};

export default ResourceService;