import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const shipmentsAdapter = createEntityAdapter({
    selectId: shipment => shipment._id,
    sortComparer: (a, b) => a.date.localeCompare(b.date)
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
    reducers: {},
    extraReducers: {}
});

export default shipmentsSlice.reducer;