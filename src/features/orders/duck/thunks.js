import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../services.js';
import { getFileName } from '../../shared/utils.js';

export const fetchPOOptions = createAsyncThunk('orders/fetchOrderOptions', async (companyId) => {
    return await OrderService.fetchOrderOptions(companyId);
});
export const submitOrderForPreview = createAsyncThunk('orders/submitOrderForPreview',
    async (_, { getState }) => {
    const { newOrder } = getState().orders;
    const file = await OrderService.generateOrderPreview(newOrder);
    const fileName = getFileName('PO', newOrder.orderDetails.orderNumber, newOrder.orderDetails.createdBy);
    return {
        fileURL: window.URL.createObjectURL(file),
        fileName
    };
});

export const submitPO = createAsyncThunk('orders/submitOrder', async (_, { getState }) => {
    const { orderDetails, orderProductInfo } = getState().orders.newOrder;
    const data = {};
    for (const [key, value] of Object.entries(orderDetails)) {
        data[key] = value;
    }
    for (const [key, value] of Object.entries(orderProductInfo)) {
        data[key] = value;
    }
    return await OrderService.addNewOrder(data);
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
    const { _id } = getState().home.company;
    return await OrderService.fetchAllOrdersByCurrentCompanyId(_id);
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
   return await OrderService.deleteOrder(orderId);
});

