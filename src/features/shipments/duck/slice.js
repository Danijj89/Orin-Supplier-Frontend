import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { startNewShipment } from './thunks.js';

const shipmentsAdapter = createEntityAdapter({
    selectId: shipment => shipment._id,
    sortComparer: (a, b) => a.date.localeCompare(b.date)
});

const initialState = shipmentsAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: {
        clients: ['company 1', 'company 2', 'company 3'],
        clientOrderMap: {
            'company 1': [ { poRef: '123'}, { poRef: '234'}, {poRef:'345'}],
            'company 2': [ { poRef: '123'}, {poRef:'345'}],
            'company 3': [ { poRef: '123'}, { poRef: '234'}],
        },
        orders: [],
        ordersRef: ['123', '234', '345'],
        orderItemMap: {}
    },
    newShipment: null
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {},
    extraReducers: {
        [startNewShipment.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [startNewShipment.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.autocomplete = action.payload;
        },
        [startNewShipment.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        }
    }
});

export const {
    selectAll: selectAllShipments,
    selectById: selectShipmentById
} = shipmentsAdapter.getSelectors(state => state.shipments);

export default shipmentsSlice.reducer;