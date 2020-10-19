import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from './services.js';

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
    async (companyId, { rejectWithValue }) => {
        try {
            return await OrderService.fetchOrdersByCompanyId(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const startNewOrder = createAsyncThunk('orders/startNewOrder',
    async ({ userId, companyId }, { rejectWithValue }) => {
        try {
            return OrderService.fetchNewOrderData(userId, companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createOrder = createAsyncThunk('orders/createOrder',
    async (order, { rejectWithValue, dispatch }) => {
        try {
            return await OrderService.createOrder(order);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
    async ({ orderId, data }) => {
        const statuses = await OrderService.updateOrderStatus(orderId, data);
        return { id: orderId, statuses };
    }
);

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
    return await OrderService.deleteOrder(orderId);
});

export const fetchOrderOptions = createAsyncThunk('orders/fetchOrderOptions',
    async (_, { getState }) => {
        const { company } = getState().home;
        return OrderService.fetchOrderOptions(company._id);
    }
);

export const fetchSelectedOrderById = createAsyncThunk('orders/fetchSelectedOrderById',
    async (id, { dispatch }) => {
        return await OrderService.fetchOrderById(id);
    });
