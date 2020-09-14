import { fetchWithAuth } from '../../shared/fetchWithAuth.js';

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
}

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
}
//
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
// const createNewPO = async (order) => {
//     const configs = {
//         method: 'post',
//         url: '/orders',
//         data: order
//     };
//     const { data } = await fetchWithAuth(configs);
//     return data;
// }
//
// const deleteOrder = async (orderId) => {
//     const configs = {
//         method: 'delete',
//         url: '/orders',
//         data: {
//             id: orderId
//         }
//     };
//     const { data } = await fetchWithAuth(configs);
//     return data;
// }
//
// const fetchOrderById = async (orderId) => {
//     const configs = {
//         method: 'get',
//         url: `/orders/${orderId}`
//     };
//     const { data } = await fetchWithAuth(configs);
//     return data;
// }
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
// const updateOrderStatus = async (id, updatedStatus) => {
//     const configs = {
//         method: 'put',
//         url: `/orders/${id}/status`,
//         data: updatedStatus
//     };
//     const { data } = await fetchWithAuth(configs);
//     return data;
// }

const POService = {
    fetchOrdersByCompanyId,
    fetchNewOrderData,
    // generatePOFiles,
    // createNewPO,
    //
    // deleteOrder,
    // fetchOrderById,
    // getPdfFilePreview,
    // updateOrderStatus,
};

export default POService;