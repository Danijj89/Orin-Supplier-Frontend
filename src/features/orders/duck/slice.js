import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createOrder, deleteOrder, fetchAllTableOrders,
    fetchOrderById,
    fetchOrders, fetchTableOrders,
    updateOrder, updateSplit
} from './thunks.js';
import { SESSION_NEW_ORDER } from 'app/sessionKeys.js';

export const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
            localStorage.removeItem(SESSION_NEW_ORDER);
        },
        cleanCurrentOrderId: (state, action) => {
            state.currentOrderId = null;
        },
        cleanOrderState: (state, action) => {
            state.error = null;
            state.status = 'IDLE';
            state.dataStatus = 'IDLE';
        },
        resetOrderStatus: (state) => {
            state.status = 'IDLE';
        }
    },
    extraReducers: {
        [fetchOrders.pending]: (state, action) => {
            state.dataStatus = 'PENDING';
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.dataStatus = 'FULFILLED';
            ordersAdapter.setAll(state, action.payload);
        },
        [fetchOrders.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
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
            state.status = 'FULFILLED';
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
            state.status = 'FULFILLED';
        },
        [deleteOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateSplit.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateSplit.fulfilled]: (state, action) => {
            const { orderId, splitId, update } = action.payload;
            const newSplits = state.entities[orderId].shippingSplits.map(split => {
                if (split._id === splitId) return { ...split, ...update };
                return split;
            });
            ordersAdapter.updateOne(state, { id: orderId, changes: { shippingSplits: newSplits } });
            state.status = 'FULFILLED';
        },
        [updateSplit.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchTableOrders.pending]: (state) => {
            state.status = 'PENDING';
        },
        [fetchTableOrders.fulfilled]: (state, action) => {
            ordersAdapter.setAll(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchTableOrders.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchAllTableOrders.pending]: (state) => {
            state.status = 'PENDING';
        },
        [fetchAllTableOrders.fulfilled]: (state, action) => {
            ordersAdapter.setAll(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchAllTableOrders.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export const {
    cleanNewOrder, cleanOrderState, cleanCurrentOrderId, resetOrderStatus
} = ordersSlice.actions;

export default ordersSlice.reducer;