import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const shipmentsAdapter = createEntityAdapter({
    selectId: shipment => shipment._id,
    sortComparer: (a, b) => a.date.localeCompare(b.date)
});

const initialState = shipmentsAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    newShipment: null,
    currentShipmentId: null
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        cleanNewShipment: (state, action) => {
            state.newShipment = null;
            state.currentShipmentId = null;
        }
    },
    extraReducers: {}
});

export const { cleanNewShipment } = shipmentsSlice.actions;

export default shipmentsSlice.reducer;