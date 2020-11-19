import { fetchWithAuth } from '../../api/utils.js';

const fetchOrdersByCompanyId = async (id) => {
    const configs = {
        method: 'get',
        url: `orders`,
        params: {
            company: id
        }
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const createOrder = async (order) => {
    const configs = {
        method: 'post',
        url: '/orders',
        data: order
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const fetchOrderById = async (id) => {
    const configs = {
        method: 'get',
        url: `/orders/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const updateOrder = async (id, update) => {
    const configs = {
        method: 'put',
        url: `/orders/${id}`,
        data: update
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const deleteOrder = async (id) => {
    const configs = {
        method: 'delete',
        url: `/orders/${id}`
    };
    const { data } = await fetchWithAuth(configs);
    return data;
};

const OrderService = {
    fetchOrdersByCompanyId,
    createOrder,
    fetchOrderById,
    updateOrder,
    deleteOrder
};

export default OrderService;