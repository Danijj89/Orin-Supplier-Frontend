import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createClient, fetchClients } from './thunks.js';

export const clientsAdapter = createEntityAdapter({
    selectId: client => client._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = clientsAdapter.getInitialState({
    status: 'IDLE',
    error: null,
});

const ordersSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchClients.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchClients.fulfilled]: (state, action) => {
            clientsAdapter.upsertMany(state, action.payload);
            state.status = 'FULFILLED';
        },
        [fetchClients.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createClient.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createClient.fulfilled]: (state, action) => {
            clientsAdapter.upsertOne(state, action.payload);
        },
        [createClient.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export default ordersSlice.reducer;