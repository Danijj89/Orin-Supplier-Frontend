import { fetchWithAuth } from './utils.js';

const fetchCompanies = async () => {
    const configs = {
        method: 'get',
        url: 'companies'
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchSessionCompany = async () => {
    const configs = {
        method: 'get',
        url: `companies/session`,
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

const createCompany = async (company) => {
    const configs = {
        method: 'post',
        url: 'companies',
        data: company
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const CompanyService = {
    fetchCompanies,
    fetchSessionCompany,
    addNewAddress,
    deleteAddress,
    updateAddress,
    updateDefaultAddress,
    updateCompany,
    createCompanyBankDetail,
    deleteCompanyBankDetail,
    updateCompanyBankDetail,
    createCompany
};

export default CompanyService;