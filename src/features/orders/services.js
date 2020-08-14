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

const fetchAllOrdersByCurrentCompanyId = async (id) => {
    const configs = {
        method: 'get',
        url: `/companies/${id}/orders`
    };
    return await fetchWithAuth(configs);
}

const deleteOrder = async (orderId) => {
    const configs = {
        method: 'delete',
        url: '/orders',
        data: {
            id: orderId
        }
    };
    return await fetchWithAuth(configs);
}

const fetchOrderById = async (orderId) => {
    const configs = {
        method: 'get',
        url: `/orders/${orderId}`
    };
    return await fetchWithAuth(configs);
}

const getPdfFilePreview = async (filename) => {
    const configs = {
        method: 'get',
        url: `/orders/preview/${filename}`,
        responseType: 'blob',
    };
    return await fetchWithAuth(configs);
}

export default {
    fetchAllOrderOptions,
    generateOrderPreview,
    addNewOrder,
    fetchAllOrdersByCurrentCompanyId,
    deleteOrder,
    fetchOrderById,
    getPdfFilePreview
};