import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createOrder, deleteOrder,
    fetchOrderById,
    fetchOrders,
    startNewOrder,
    updateOrderDetails, updateOrderNotes, updateOrderProducts,
    updateOrderStatus
} from './thunks.js';
import { SESSION_NEW_ORDER } from '../../../app/sessionKeys.js';
import { defaultRowValues } from '../utils/constants.js';

export const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => a.date.localeCompare(b.date)
});

const initialState = ordersAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null,
    newOrder: null,
    currentOrderId: null
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        cleanNewOrder: (state, action) => {
            state.newOrder = null;
            sessionStorage.removeItem(SESSION_NEW_ORDER);
        },
        cleanCurrentOrderId: (state, action) => {
            state.currentOrderId = null;
        },
        cleanOrderStore: (state, action) => {
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
        [startNewOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [startNewOrder.fulfilled]: (state, action) => {
            const newOrder = action.payload;
            newOrder.items = [defaultRowValues];
            state.newOrder = newOrder;
            state.currentOrderId = null;
            state.status = 'FULFILLED';
        },
        [startNewOrder.rejected]: (state, action) => {
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
        [updateOrderDetails.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateOrderDetails.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            ordersAdapter.updateOne(state, { id: _id, changes });
            state.status = 'IDLE';
        },
        [updateOrderDetails.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateOrderStatus.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateOrderStatus.fulfilled]: (state, action) => {
            const { id, status } = action.payload;
            ordersAdapter.updateOne(state, { id, changes: { status } });
            state.status = 'IDLE';
        },
        [updateOrderStatus.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateOrderNotes.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateOrderNotes.fulfilled]: (state, action) => {
            const { id, notes } = action.payload;
            ordersAdapter.updateOne(state, { id, changes: { notes } });
            state.status = 'IDLE';
        },
        [updateOrderNotes.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateOrderProducts.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateOrderProducts.fulfilled]: (state, action) => {
            const { _id, ...updatedOrder } = action.payload;
            ordersAdapter.updateOne(state, { id: _id, changes: updatedOrder });
            state.status = 'IDLE';
        },
        [updateOrderProducts.rejected]: (state, action) => {
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
    cleanNewOrder, cleanOrderStore, cleanCurrentOrderId
} = ordersSlice.actions;

export default ordersSlice.reducer;