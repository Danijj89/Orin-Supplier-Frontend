import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    deleteOrder, fetchOrderOptions,
    fetchOrders, startNewOrder, submitOrder, updateOrderStatus,
} from './thunks.js';
import { getFileName } from '../../shared/utils.js';

export const defaultTableHeaders = [
    'Item Ref',
    'Product Description',
    null,
    null,
    'Quantity',
    'Unit Price',
    'Amount'
];

export const defaultRowValues = {
    _id: null,
    ref: '',
    description: '',
    custom1: '',
    custom2: '',
    quantity: 0,
    unit: 'PCS',
    price: 0,
    total: 0
};

const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => a.crd.localeCompare(b.crd)
});

const initialState = ordersAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: null,
    newOrder: null,
    currentOrderId: null
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        submitOrderDetails: (state, action) => {
            const { poRef } = action.payload;
            for (const [key, value] of Object.entries(action.payload)) {
                state.newOrder[key] = value;
            }
            state.newOrder.fileName = getFileName('PO', poRef, state.newOrder.createdBy);
        },
        submitPOProductInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newOrder[key] = value;
            }
        },
        setCurrentPOId: (state, action) => {
            state.currentPOId = action.payload;
        },
        cleanNewOrder: (state, action) => {
            state.newOrder = null;
        }
        // updateOrderDocument: (state, action) => {
        //     const { docType, doc } = action.payload;
        //     const { currentPOId } = state;
        //     const currentPO = state.entities[currentPOId];
        //     if (currentPO) {
        //         const newDocuments = currentPO.documents;
        //         newDocuments[docType] = doc;
        //         ordersAdapter.updateOne(state, { id: currentPOId, changes: { documents: newDocuments } })
        //     }
        // },
        // deleteOrderDocument: (state, action) => {
        //     const { docType, id } = action.payload;
        //     const { [docType]: type, ...rest } = state.entities[id].documents;
        //     ordersAdapter.updateOne(state, { id, changes: { documents: rest } })
        // }
    },
    extraReducers: {
        [fetchOrders.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.status = 'FULFILLED';
            ordersAdapter.upsertMany(state, action.payload);
        },
        [fetchOrders.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [startNewOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [startNewOrder.fulfilled]: (state, action) => {
            state.status = 'FULFILLED';
            const { newOrder, ...rest } = action.payload;
            state.autocomplete = rest;
            newOrder.headers = defaultTableHeaders;
            newOrder.unallocated = [defaultRowValues];
            state.newOrder = newOrder;
        },
        [startNewOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitOrder.fulfilled]: (state, action) => {
            const { _id } = action.payload;
            state.status = 'IDLE';
            ordersAdapter.upsertOne(state, action.payload);
            state.newOrder = null;
            state.currentOrderId = _id;
        },
        [submitOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [updateOrderStatus.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateOrderStatus.fulfilled]: (state, action) => {
            const { id, statuses } = action.payload;
            state.status = 'IDLE';
            const changes = {
                procurementS: statuses.procurementS,
                productionS: statuses.productionS,
                qaS: statuses.qaS
            };
            ordersAdapter.updateOne(state, { id, changes });
        },
        [updateOrderStatus.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [deleteOrder.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            ordersAdapter.removeOne(state, action.payload);
        },
        [deleteOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [fetchOrderOptions.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchOrderOptions.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.autocomplete = action.payload;
        },
        [fetchOrderOptions.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        // [submitOrderForPreview.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [submitOrderForPreview.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        //     state.previewFileURL = action.payload;
        // },
        // [submitOrderForPreview.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },


        // [fetchSelectedOrderById.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [fetchSelectedOrderById.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        //     const { _id: id } = action.payload;
        //     state.currentPOId = id;
        //     ordersAdapter.updateOne(state, { id, changes: action.payload })
        // },
        // [fetchSelectedOrderById.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
    }
});

export const {
    submitOrderDetails, submitPOProductInfo,
    setCurrentPOId, cleanNewOrder, updateOrderDocument, deleteOrderDocument
} = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;