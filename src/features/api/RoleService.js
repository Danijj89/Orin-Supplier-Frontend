import { fetchWithAuth } from './utils.js';

const fetchRoles = async () => {
    const configs = {
        method: 'get',
        url: 'roles'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const RoleService = {
    fetchRoles
};

export default RoleService