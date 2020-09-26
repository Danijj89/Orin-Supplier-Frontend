import { fetchWithAuth } from './fetchWithAuth.js';

const addNewAddress = async (id, address) => {
    const configs = {
        method: 'post',
        url: `companies/${id}/addresses`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const CompanyService = {
    addNewAddress
};

export default CompanyService;