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

const createUser = async (user) => {
    const configs = {
        method: 'post',
        url: 'users',
        data: user
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateUserRoles = async (userId, update) => {
    const configs = {
        method: 'put',
        url: `users/${ userId }/roles`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const UserService = {
    updateUser,
    fetchUsers,
    createUser,
    updateUserRoles
};

export default UserService;