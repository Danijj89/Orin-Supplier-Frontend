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

const fetchNewOrderData = async (userId, companyId) => {
    const configs = {
        method: 'get',
        url: `/orders/new`,
        params: {
            user: userId,
            company: companyId
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

const updateOrderProducts = async (id, update) => {
    const configs = {
        method: 'put',
        url: `/orders/${id}/products`,
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


// const generatePOFiles = async (order) => {
//     const configs = {
//         method: 'post',
//         responseType: 'blob',
//         url: '/file/po',
//         data: order
//     };
//     const { data } = await fetchWithAuth(configs);
//     return data;
// }
//

//
// const getPdfFilePreview = async (filename) => {
//     const configs = {
//         method: 'get',
//         url: `/orders/preview/${filename}.pdf`,
//         responseType: 'blob',
//     };
//     const { data } = await fetchWithAuth(configs);
//     return data;
// }
//


const OrderService = {
    fetchOrdersByCompanyId,
    fetchNewOrderData,
    createOrder,
    fetchOrderById,
    updateOrder,
    updateOrderProducts,
    deleteOrder,
    // generatePOFiles,
    // fetchOrderById,
    // getPdfFilePreview,

};

export default OrderService;