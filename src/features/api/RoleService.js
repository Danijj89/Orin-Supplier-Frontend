import { fetchWithAuth } from './utils.js';

const fetchRoles = async () => {
    const configs = {
        method: 'get',
        url: 'roles'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createRole = async (role) => {
    const configs = {
        method: 'post',
        url: 'roles',
        data: role
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const RoleService = {
    fetchRoles,
    createRole
};

export default RoleService