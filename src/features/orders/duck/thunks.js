import { createAsyncThunk } from '@reduxjs/toolkit';
import POService from './services.js';

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
    async (_, { getState }) => {
        const { _id } = getState().home.company;
        return await POService.fetchOrdersByCompanyId(_id);
    });

export const startNewOrder = createAsyncThunk('orders/startNewOrder',
    async (_, { getState }) => {
        const { user, company } = getState().home;
        return POService.fetchNewOrderData(user._id, company._id);
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
