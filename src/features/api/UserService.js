import { fetchWithAuth } from './utils.js';

const updateUser = async (id, update) => {
    const configs = {
        method: 'put',
        url: `users/${ id }`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchUsers = async () => {
    const configs = {
        method: 'get',
        url: 'users'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const UserService = {
    updateUser,
    fetchUsers
};

export default UserService;