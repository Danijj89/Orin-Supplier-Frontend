import { createAsyncThunk } from '@reduxjs/toolkit';
import POService from '../services.js';

export const fetchPOOptions = createAsyncThunk('orders/fetchOrderOptions', async (companyId) => {
    return await POService.fetchOrderOptions(companyId);
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

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { getState }) => {
    const { _id } = getState().home.company;
    return await POService.fetchAllOrdersByCurrentCompanyId(_id);
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
   return await POService.deleteOrder(orderId);
});

