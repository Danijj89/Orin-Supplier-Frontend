import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createDocument,
    createShipment, deleteDocument, deleteShipment,
    fetchShipmentById,
    fetchShipments, updateShipment,
    updateShipmentShell
} from './thunks.js';

export const shipmentsAdapter = createEntityAdapter({
    selectId: shipment => shipment._id,
    sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

const initialState = shipmentsAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null,
    currentShipmentId: null
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        cleanCurrentShipmentId: (state) => {
            state.currentShipmentId = null;
        },
        cleanShipmentState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        },
        cleanShipmentStatus: (state) => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [createShipment.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createShipment.fulfilled]: (state, action) => {
            const { _id } = action.payload;
            shipmentsAdapter.upsertOne(state, action.payload);
            state.currentShipmentId = _id;
            state.status = 'FULFILLED';
        },
        [createShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchShipments.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchShipments.fulfilled]: (state, action) => {
            shipmentsAdapter.upsertMany(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchShipments.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchShipmentById.pending]: (state) => {
            state.status = 'PENDING';
        },
        [fetchShipmentById.fulfilled]: (state, action) => {
            shipmentsAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchShipmentById.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateShipmentShell.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateShipmentShell.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id: _id, changes });
            state.currentShipmentId = _id;
            state.status = 'FULFILLED';
        },
        [updateShipmentShell.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateShipment.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateShipment.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id: _id, changes });
            state.status = 'FULFILLED';
        },
        [updateShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createDocument.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createDocument.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id: _id, changes });
            state.status = 'FULFILLED';
        },
        [createDocument.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteShipment.pending]: (state) => {
            state.status = 'PENDING';
        },
        [deleteShipment.fulfilled]: (state, action) => {
            shipmentsAdapter.removeOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [deleteShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteDocument.pending]: (state) => {
            state.status = 'PENDING';
        },
        [deleteDocument.fulfilled]: (state, action) => {
            const { shipmentId, documentId } = action.payload;
            const newDocuments = state.entities[shipmentId].documents.filter(doc => doc._id !== documentId);
            shipmentsAdapter.updateOne(state, { id: shipmentId, changes: { documents: newDocuments } });
            state.status = 'FULFILLED';
        },
        [deleteDocument.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanCurrentShipmentId, cleanShipmentState, cleanShipmentStatus } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;