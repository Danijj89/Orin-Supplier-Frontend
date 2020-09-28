import { fetchWithAuth } from './fetchWithAuth.js';

const addNewAddress = async (companyId, address) => {
    const configs = {
        method: 'post',
        url: `companies/${companyId}/addresses`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteAddress = async (companyId, addressId) => {
    const configs = {
        method: 'delete',
        url: `companies/${companyId}/addresses/${addressId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateAddress = async (companyId, addressId, address) => {
    const configs = {
        method: 'put',
        url: `companies/${companyId}/addresses/${addressId}`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const CompanyService = {
    addNewAddress,
    deleteAddress,
    updateAddress
};

export default CompanyService;