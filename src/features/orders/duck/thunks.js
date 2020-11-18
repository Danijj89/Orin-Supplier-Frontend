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

export const updateOrderDetails = createAsyncThunk('orders/updateOrderDetails',
    async ({ _id, ...rest }, { rejectWithValue }) => {
        try {
            return await OrderService.updateOrderDetails(_id, rest);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
    async ({ id, ...status }, { rejectWithValue }) => {
        try {
            await OrderService.updateOrderStatus(id, { status });
            return { id, status };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateOrderNotes = createAsyncThunk('orders/updateOrderNotes',
    async ({ id, notes }, { rejectWithValue }) => {
        try {
            await OrderService.updateOrderNotes(id, { notes });
            return { id, notes };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const updateOrderProducts = createAsyncThunk('orders/updateOrderProducts',
    async ({ id, ...update }, { rejectWithValue }) => {
        try {
            return await OrderService.updateOrderProducts(id, update);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });

export const deleteOrder = createAsyncThunk('orders/deleteOrder',
    async (id, {rejectWithValue}) => {
        try {
            await OrderService.deleteOrder(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    });
