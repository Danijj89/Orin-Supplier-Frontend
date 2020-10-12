import { createAsyncThunk } from '@reduxjs/toolkit';
import POService from './services.js';

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
    async (_, { getState }) => {
        const { company: companyId } = getState().home.user;
        return await POService.fetchOrdersByCompanyId(companyId);
    });

export const startNewOrder = createAsyncThunk('orders/startNewOrder',
    async (_, { getState }) => {
        const { _id, company } = getState().home.user;
        return POService.fetchNewOrderData(_id, company);
    });

export const submitOrder = createAsyncThunk('orders/submitOrder', async (_, { getState }) => {
    const { newOrder } = getState().orders;
    return POService.createNewOrder(newOrder);
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
    async ({ orderId, data }) => {
        const statuses = await POService.updateOrderStatus(orderId, data);
        return { id: orderId, statuses };
    }
);

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
    return await POService.deleteOrder(orderId);
});

export const fetchOrderOptions = createAsyncThunk('orders/fetchOrderOptions',
    async (_, { getState }) => {
        const { company } = getState().home;
        return POService.fetchOrderOptions(company._id);
    }
);

export const fetchSelectedOrderById = createAsyncThunk('orders/fetchSelectedOrderById',
    async (id, { dispatch }) => {
        return await POService.fetchOrderById(id);
    });
