import { createAsyncThunk } from '@reduxjs/toolkit';
import POService from './services.js';

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
    async (_, { getState }) => {
        const { _id } = getState().home.company;
        return await POService.fetchOrdersByCompanyId(_id);
    });

export const startNewOrder = createAsyncThunk('orders/startNewPO',
    async (_, { getState }) => {
        const { user, company } = getState().home;
        return POService.fetchNewOrderData(user._id, company._id);
    });

export const submitOrderForPreview = createAsyncThunk('orders/submitOrderForPreview',
    async (_, { getState }) => {
    const { newPO } = getState().orders;
    const file = await POService.generatePOFiles(newPO);
    return window.URL.createObjectURL(file);
});

export const submitPO = createAsyncThunk('orders/submitOrder', async (_, { getState }) => {
    const { newPO } = getState().orders;
    return await POService.createNewPO(newPO);
});


export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
   return await POService.deleteOrder(orderId);
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
    async ({ orderId, data }) => {
        return POService.updateOrderStatus(orderId, data);
    }
);

export const fetchSelectedOrderById = createAsyncThunk('orders/fetchSelectedOrderById',
    async (id, { dispatch }) => {
    return await POService.fetchOrderById(id);
});
