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

const updateDefaultAddress = async (companyId, addressId) => {
    const configs = {
        method: 'put',
        url: `companies/${companyId}/addresses/${addressId}/default`,
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchCompany = async (id) => {
    const configs = {
        method: 'get',
        url: `companies/${id}`,
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchAutocompleteOptions = async (id) => {
    const configs = {
        method: 'get',
        url: `companies/${id}/options`,
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const CompanyService = {
    addNewAddress,
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
    fetchCompany,
    fetchAutocompleteOptions
};

export default CompanyService;