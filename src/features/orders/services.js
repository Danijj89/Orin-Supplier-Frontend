import { fetchWithAuth } from '../shared/fetchWithAuth.js';

const fetchOrderOptions = async (companyId) => {
    const configs = {
        method: 'get',
        url: `/companies/${companyId}/document_autocomplete/po`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const generateOrderPreview = async (order) => {
    const configs = {
        method: 'post',
        responseType: 'blob',
        url: '/orders/preview',
        data: order
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const addNewOrder = async (order) => {
    const configs = {
        method: 'post',
        url: '/orders',
        data: order
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const fetchAllOrdersByCurrentCompanyId = async (id) => {
    const configs = {
        method: 'get',
        url: `/companies/${id}/orders`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const deleteOrder = async (orderId) => {
    const configs = {
        method: 'delete',
        url: '/orders',
        data: {
            id: orderId
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const fetchOrderById = async (orderId) => {
    const configs = {
        method: 'get',
        url: `/orders/${orderId}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

const getPdfFilePreview = async (filename) => {
    const configs = {
        method: 'get',
        url: `/orders/preview/${filename}.pdf`,
        responseType: 'blob',
    };
    const { data } = await fetchWithAuth(configs);
    return data;
}

export default {
    fetchOrderOptions,
    generateOrderPreview,
    addNewOrder,
    fetchAllOrdersByCurrentCompanyId,
    deleteOrder,
    fetchOrderById,
    getPdfFilePreview
};