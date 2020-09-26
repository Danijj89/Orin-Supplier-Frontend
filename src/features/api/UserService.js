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

const UserService = {
    updateUser
};

export default UserService;