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

const fetchUsers = async (companyId) => {
    const configs = {
        method: 'get',
        url: 'users',
        params: {
            company: companyId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const UserService = {
    updateUser,
    fetchUsers
};

export default UserService;