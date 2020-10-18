import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchOrders, startNewOrder } from './thunks.js';
import { SESSION_NEW_ORDER } from '../../../app/sessionKeys.js';
import { defaultRowValues } from '../utils/constants.js';

const ordersAdapter = createEntityAdapter({
    selectId: order => order._id,
    sortComparer: (a, b) => a.crd.localeCompare(b.crd)
});

const initialState = ordersAdapter.getInitialState({
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
        }
        // setCurrentPOId: (state, action) => {
        //     state.currentPOId = action.payload;
        // },
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
            state.status = 'IDLE';
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
            state.status = 'IDLE';
            ordersAdapter.upsertOne(state, action.payload);
            state.currentOrderId = _id;
        },
        [createOrder.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        // [submitOrder.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [submitOrder.fulfilled]: (state, action) => {
        //
        // },
        // [submitOrder.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
        // [updateOrderStatus.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [updateOrderStatus.fulfilled]: (state, action) => {
        //     const { id, statuses } = action.payload;
        //     state.status = 'IDLE';
        //     const changes = {
        //         procurementS: statuses.procurementS,
        //         productionS: statuses.productionS,
        //         qaS: statuses.qaS
        //     };
        //     ordersAdapter.updateOne(state, { id, changes });
        // },
        // [updateOrderStatus.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
        // [deleteOrder.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [deleteOrder.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        //     ordersAdapter.removeOne(state, action.payload);
        // },
        // [deleteOrder.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
        // [fetchOrderOptions.pending]: (state, action) => {
        //     state.status = 'PENDING';
        // },
        // [fetchOrderOptions.fulfilled]: (state, action) => {
        //     state.status = 'IDLE';
        //     state.autocomplete = action.payload;
        // },
        // [fetchOrderOptions.rejected]: (state, action) => {
        //     state.status = 'REJECTED';
        //     state.error = action.error.message;
        // },
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
    cleanNewOrder
} = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;