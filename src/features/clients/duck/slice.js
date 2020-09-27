import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const ordersAdapter = createEntityAdapter({
    selectId: client => client._id,
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
    reducers: {},
    extraReducers: {}
});

export const { hello } = ordersSlice.actions;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById
} = ordersAdapter.getSelectors(state => state.orders);

export default ordersSlice.reducer;