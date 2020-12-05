import { createAsyncThunk } from '@reduxjs/toolkit';
import OrderService from './services.js';

export const fetchOrders = createAsyncThunk('orders/fetchOrders',
    async ({ companyId }, { rejectWithValue }) => {
        try {
            return await OrderService.fetchOrdersByCompanyId(companyId);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const createOrder = createAsyncThunk('orders/createOrder',
    async ({ data }, { rejectWithValue, dispatch }) => {
        try {
            return await OrderService.createOrder(data);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById',
    async (id, { rejectWithValue }) => {
        try {
            return await OrderService.fetchOrderById(id);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateOrder = createAsyncThunk('orders/updateOrderDetails',
    async ({ orderId, update }, { rejectWithValue }) => {
        try {
            return await OrderService.updateOrder(orderId, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteOrder = createAsyncThunk('orders/deleteOrder',
    async ({ orderId }, { rejectWithValue }) => {
        try {
            await OrderService.deleteOrder(orderId);
            return orderId;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
    async ({ orderId, update }, { rejectWithValue }) => {
        try {
            await OrderService.updateOrderStatus(orderId, update);
            return { orderId, update };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });
