import { fetchWithAuth } from './utils.js';

const fetchCompanyById = async (id) => {
    const configs = {
        method: 'get',
        url: `companies/${ id }`,
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const addNewAddress = async (companyId, address) => {
    const configs = {
        method: 'post',
        url: `companies/${ companyId }/addresses`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteAddress = async (companyId, addressId) => {
    const configs = {
        method: 'delete',
        url: `companies/${ companyId }/addresses/${ addressId }`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateAddress = async (companyId, addressId, address) => {
    const configs = {
        method: 'put',
        url: `companies/${ companyId }/addresses/${ addressId }`,
        data: address
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateDefaultAddress = async (companyId, addressId) => {
    const configs = {
        method: 'put',
        url: `companies/${ companyId }/addresses/${ addressId }/default`,
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateCompany = async (id, update) => {
    const configs = {
        method: 'put',
        url: `companies/${ id }`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createCompanyBankDetail = async (id, bankDetail) => {
    const configs = {
        method: 'post',
        url: `companies/${ id }/bankDetails`,
        data: bankDetail
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteCompanyBankDetail = async (companyId, bankDetailsId) => {
    const configs = {
        method: 'delete',
        url: `companies/${ companyId }/bankDetails/${ bankDetailsId }`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateCompanyBankDetail = async (companyId, bankDetailsId, update) => {
    const configs = {
        method: 'put',
        url: `companies/${ companyId }/bankDetails/${ bankDetailsId }`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const CompanyService = {
    fetchCompanyById,
    addNewAddress,
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
    updateCompany,
    createCompanyBankDetail,
    deleteCompanyBankDetail,
    updateCompanyBankDetail
};

export default CompanyService;