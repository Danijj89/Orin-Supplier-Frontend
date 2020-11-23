import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createDocument,
    createShipment, deleteShipment,
    fetchShipmentById,
    fetchShipments, updateShipment,
    updateShipmentInfo,
    updateShipmentShell
} from './thunks.js';

export const shipmentsAdapter = createEntityAdapter({
    selectId: shipment => shipment._id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
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
        cleanNewShipment: (state, action) => {
            state.currentShipmentId = null;
        },
        cleanShipmentError: (state, action) => {
            state.error = null;
        },
        cleanShipmentStatus: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [createShipment.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createShipment.fulfilled]: (state, action) => {
            const { _id } = action.payload;
            shipmentsAdapter.upsertOne(state, action.payload);
            state.currentShipmentId = _id;
            state.status = 'IDLE';
        },
        [createShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchShipments.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchShipments.fulfilled]: (state, action) => {
            shipmentsAdapter.upsertMany(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchShipments.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchShipmentById.pending]: (state, action) => {
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
        [updateShipmentShell.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateShipmentShell.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id: _id, changes });
            state.currentShipmentId = _id;
            state.status = 'IDLE';
        },
        [updateShipmentShell.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateShipmentInfo.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateShipmentInfo.fulfilled]: (state, action) => {
            const { id, update: changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [updateShipmentInfo.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateShipment.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateShipment.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id: _id, changes });
            state.status = 'IDLE';
        },
        [updateShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createDocument.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createDocument.fulfilled]: (state, action) => {
            const { _id, ...changes } = action.payload;
            shipmentsAdapter.updateOne(state, { id: _id, changes });
            state.status = 'IDLE';
        },
        [createDocument.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteShipment.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteShipment.fulfilled]: (state, action) => {
            shipmentsAdapter.updateOne(state, { id: action.payload, changes: { active: false } });
            state.status = 'IDLE';
        },
        [deleteShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanNewShipment, cleanShipmentError, cleanShipmentStatus } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;