import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchAllOrderOptions = async (companyId) => {
    const configs = {
        method: 'get',
        url: `/orders/${companyId}/options`
    };
    return await fetchWithAuth(configs);
}

const generateOrderPreview = async (data) => {
    const configs = {
        method: 'post',
        responseType: 'blob',
        url: '/orders/preview',
        data
    };
    return await fetchWithAuth(configs);
}

const addNewOrder = async (data) => {
    const configs = {
        method: 'post',
        url: '/orders',
        data
    };
    return await fetchWithAuth(configs);
}

const downloadPO = async (data) => {
    const configs = {
        method: 'post',
        url: '/download/po',
        responseType: 'blob',
        data
    };
    return await fetchWithAuth(configs);
}

const fetchAllOrdersByCurrentCompanyId = async (id) => {
    const configs = {
        method: 'get',
        url: `/orders/${id}`
    };
    return await fetchWithAuth(configs);
}

export default {
    fetchAllOrderOptions,
    generateOrderPreview,
    addNewOrder,
    downloadPO,
    fetchAllOrdersByCurrentCompanyId
};