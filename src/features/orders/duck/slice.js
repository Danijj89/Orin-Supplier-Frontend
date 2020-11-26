import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createOrder, deleteOrder,
    fetchOrderById,
    fetchOrders,
    updateOrder
} from './thunks.js';
import { SESSION_NEW_ORDER } from '../../../app/sessionKeys.js';

export const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = ordersAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null,
    currentOrderId: null
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        cleanNewOrder: (state, action) => {
            sessionStorage.removeItem(SESSION_NEW_ORDER);
        },
        cleanCurrentOrderId: (state, action) => {
            state.currentOrderId = null;
        },
        cleanOrderError: (state, action) => {
            state.error = null;
            state.status = 'IDLE';
            state.dataStatus = 'IDLE';
        }
    },
    extraReducers: {
        [fetchOrders.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.dataStatus = 'FULFILLED';
            ordersAdapter.upsertMany(state, action.payload);
        },
        [fetchOrders.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createOrder.fulfilled]: (state, action) => {
            const { _id } = action.payload;
            ordersAdapter.upsertOne(state, action.payload);
            state.currentOrderId = _id;
            state.status = 'FULFILLED';
        },
        [createOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchOrderById.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchOrderById.fulfilled]: (state, action) => {
            ordersAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchOrderById.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateOrder.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            ordersAdapter.updateOne(state, { id: _id, changes });
            state.status = 'IDLE';
        },
        [updateOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteOrder.fulfilled]: (state, action) => {
            ordersAdapter.updateOne(state, { id: action.payload, changes: { active: false } });
            state.status = 'IDLE';
        },
        [deleteOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const {
    cleanNewOrder, cleanOrderError, cleanCurrentOrderId
} = ordersSlice.actions;

export default ordersSlice.reducer;