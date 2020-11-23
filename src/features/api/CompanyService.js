import { fetchWithAuth } from './utils.js';

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

const updateCompany = async (id, update) => {
    const configs = {
        method: 'put',
        url: `companies/${id}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createCompanyBankDetail = async (id, bankDetail) => {
    const configs = {
        method: 'post',
        url: `companies/${id}`,
        data: bankDetail
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const CompanyService = {
    addNewAddress,
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
    updateCompany,
    createCompanyBankDetail
};

export default CompanyService;