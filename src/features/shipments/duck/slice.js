import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createShipment, fetchShipmentById, fetchShipments, updateShipmentShell } from './thunks.js';

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
            state.status = 'FULFILLED';
        },
        [updateShipmentShell.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export const { cleanNewShipment, cleanShipmentError } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;