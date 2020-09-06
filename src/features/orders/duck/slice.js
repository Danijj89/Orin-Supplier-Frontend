import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    deleteOrder,
    fetchOrders,
    submitPO,
    submitOrderForPreview,
    updateOrderStatus, startNewPO
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
    currentPO: null,
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
        setCurrentPO: (state, action) => {
            state.currentPO = action.payload;
        },
        updateOrderDocument: (state, action) => {
            const { docType, doc } = action.payload;
            const { _id } = state.currentPO;
            state.currentPO.documents[docType] = doc;
            const entity = state.entities[_id];
            if (entity) {
            const newDocuments = entity.documents;
                newDocuments[docType] = doc;
                ordersAdapter.updateOne(state, { id: _id, changes: { documents: newDocuments }})
            }
        },
        deleteOrderDocument: (state, action) => {
            const { docType, id } = action.payload;
            const { [docType]: type, ...rest} = state.currentPO.documents;
            state.currentPO.documents = rest;
            ordersAdapter.updateOne(state, { id, changes: { documents: rest }})
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
        [deleteOrder.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            ordersAdapter.removeOne(state, action.payload);
        },
        [updateOrderStatus.fulfilled]: (state, action) => {
            const { _id, status } = action.payload;
            state.status = 'IDLE';
            ordersAdapter.updateOne(state, { id: _id, changes: { status: status }});
            state.currentPO = action.payload;
        }
    }
});

export const { submitOrderDetails, submitPOProductInfo,
    setCurrentPO, updateOrderDocument, deleteOrderDocument } = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;