import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from '../services.js';

export const fetchAllOrderOptions = createAsyncThunk('orders/fetchAllOrderOptions', async (companyId) => {
    return await OrderService.fetchAllOrderOptions(companyId);
});
export const submitOrderForPreview = createAsyncThunk('orders/submitOrderForPreview',
    async (_, { getState }) => {
    const { newOrder } = getState().orders;
    const file = await OrderService.generateOrderPreview(newOrder);
    return window.URL.createObjectURL(file);
});

export const submitOrder = createAsyncThunk('orders/submitOrder', async (_, { getState }) => {
    const { orderDetails, orderProductInfo } = getState().orders.newOrder;
    const data = {};
    for (const [key, value] of Object.entries(orderDetails)) {
        data[key] = value;
    }
    for (const [key, value] of Object.entries(orderProductInfo)) {
        data[key] = value;
    }
    return  await OrderService.addNewOrder(data);
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
    const { _id } = getState().home.company;
    return await OrderService.fetchAllOrdersByCurrentCompanyId(_id);
});