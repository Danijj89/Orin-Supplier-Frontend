import { fetchWithAuth } from './utils.js';

const fetchPermissions = async () => {
    const configs = {
        method: 'get',
        url: 'permissions'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createPermission = async (permission) => {
    const configs = {
        method: 'post',
        url: 'permissions',
        data: permission
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};


const PermissionService = {
    fetchPermissions,
    createPermission
};

export default PermissionService;