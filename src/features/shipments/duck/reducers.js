import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const shipmentsAdapter = createEntityAdapter({
    selectId: shipment => shipment._id,
    sortComparer: (a, b) => a.date.localeCompare(b.date)
});

const initialState = shipmentsAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: {}
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {}
});

export const {} = shipmentsSlice.actions;

export const {
    selectAll: selectAllShipments,
    selectById: selectShipmentById
} = shipmentsAdapter.getSelectors(state => state.shipments);

export default shipmentsSlice.reducer;