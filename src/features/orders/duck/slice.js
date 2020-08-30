import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LANGUAGE } from '../../../constants.js';
import { deleteOrder, fetchPOOptions, fetchOrders, submitPO, submitOrderForPreview } from './thunks.js';

const defaultRowValues = ['', '', '', '', 0, 'PCS', 0, 0];

const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => a.crd.localeCompare(b.crd)
});

const getOrderDefaultValues = () => {
    return {
        poRef: null,
        fromName: null,
        fromAdd: null,
        to: null,
        toName: null,
        toAdd: null,
        date: new Date().toISOString(),
        incoterm: null,
        crd: new Date().toISOString(),
        pol: '',
        pod: '',
        pay: null,
        del: 'Ocean',
        carrier: '',
        orderRef: null,
        remarks: null,
        currency: 'USD',
        headers: LANGUAGE.order.productTable.defaultHeaders,
        items: [defaultRowValues],
        totalQ: {'PCS': 0},
        totalA: 0,
        createdBy: null,
        fileName: null
    }
}

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
    newPO: getOrderDefaultValues(),
    selectedOrder: null,
    previewFileURL: null
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        startNewOrder: (state, action) => {
            state.newOrder = getOrderDefaultValues();
        },
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
        selectOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        updateOrderDocument: (state, action) => {
            const { docType, doc } = action.payload;
            const { _id } = state.selectedOrder;
            state.selectedOrder.documents[docType] = doc;
            const entity = state.entities[_id];
            if (entity) {
            const newDocuments = entity.documents;
                newDocuments[docType] = doc;
                ordersAdapter.updateOne(state, { id: _id, changes: { documents: newDocuments }})
            }
        },
        deleteOrderDocument: (state, action) => {
            const { docType, id } = action.payload;
            const { [docType]: type, ...rest} = state.selectedOrder.documents;
            state.selectedOrder.documents = rest;
            ordersAdapter.updateOne(state, { id, changes: { documents: rest }})
        }
    },
    extraReducers: {
        [fetchPOOptions.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchPOOptions.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.autocomplete = action.payload;
        },
        [fetchPOOptions.rejected]: (state, action) => {
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
        }
    }
});

export const { startNewOrder, submitOrderDetails, submitPOProductInfo,
    selectOrder, updateOrderDocument, deleteOrderDocument } = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;