import { fetchWithAuth } from './fetchWithAuth.js';

const updateUser = async (id, update) => {
    const configs = {
        method: 'put',
        url: `users/${id}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const resetPassword = async (id, password) => {
    const configs = {
        method: 'put',
        url: `users/${id}/password`,
        data: password
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchUsersByCompanyId = async (id) => {
    const configs = {
        method: 'get',
        url: `users`,
        params: {
            company: id
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const UserService = {
    updateUser,
    resetPassword,
    fetchUsersByCompanyId
};

export default UserService;