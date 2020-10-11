import { fetchWithAuth } from './utils.js';

const fetchUsers = async (id) => {
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

const updateUser = async (id, update) => {
    const configs = {
        method: 'put',
        url: `users/${ id }`,
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

const UserService = {
    fetchUsers,
    updateUser,
    resetPassword
};

export default UserService;