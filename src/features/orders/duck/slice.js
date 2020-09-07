import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    deleteOrder,
    fetchOrders,
    submitPO,
    submitOrderForPreview,
    updateOrderStatus, startNewPO, fetchSelectedOrderById
} from './thunks.js';

const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => a.crd.localeCompare(b.crd)
});

const initialState = ordersAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: {
        deliveryOptions: [],
        itemsRef: [],
        itemDescriptionMap: {},
        customerNames: [],
        customerAddressMap: {},
        ports: []
    },
    newPO: null,
    currentPOId: null,
    previewFileURL: null
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        submitOrderDetails: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPO[key] = value;
            }
        },
        submitPOProductInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPO[key] = value;
            }
        },
        setCurrentPOId: (state, action) => {
            state.currentPOId = action.payload;
        },
        updateOrderDocument: (state, action) => {
            const { docType, doc } = action.payload;
            const { currentPOId } = state;
            const currentPO = state.entities[currentPOId];
            if (currentPO) {
                const newDocuments = currentPO.documents;
                newDocuments[docType] = doc;
                ordersAdapter.updateOne(state, { id: currentPOId, changes: { documents: newDocuments } })
            }
        },
        deleteOrderDocument: (state, action) => {
            const { docType, id } = action.payload;
            const { [docType]: type, ...rest } = state.entities[id].documents;
            ordersAdapter.updateOne(state, { id, changes: { documents: rest } })
        }
    },
    extraReducers: {
        [startNewPO.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [startNewPO.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            const { newPO, ...rest } = action.payload;
            state.autocomplete = rest;
            state.newPO = newPO;
        },
        [startNewPO.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitOrderForPreview.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitOrderForPreview.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.previewFileURL = action.payload;
        },
        [submitOrderForPreview.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitPO.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitPO.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            ordersAdapter.upsertOne(state, action.payload);
        },
        [submitPO.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [fetchOrders.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            ordersAdapter.upsertMany(state, action.payload);
        },
        [fetchOrders.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            ordersAdapter.removeOne(state, action.payload);
        },
        [updateOrderStatus.fulfilled]: (state, action) => {
            const { _id, status } = action.payload;
            state.status = 'IDLE';
            ordersAdapter.updateOne(state, { id: _id, changes: { status: status } });
        },
        [fetchSelectedOrderById.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchSelectedOrderById.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            const { _id: id } = action.payload;
            state.currentPOId = id;
            ordersAdapter.updateOne(state, { id, changes: action.payload })
        },
        [fetchSelectedOrderById.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
    }
});

export const {
    submitOrderDetails, submitPOProductInfo,
    setCurrentPOId, updateOrderDocument, deleteOrderDocument
} = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;