import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createClient, fetchClientById, fetchClients, updateClient } from './thunks.js';

export const clientsAdapter = createEntityAdapter({
    selectId: client => client._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = clientsAdapter.getInitialState({
    status: 'IDLE',
    error: null
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
            state.status = 'FULFILLED';
        },
        [createClient.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [fetchClientById.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [fetchClientById.fulfilled]: (state, action) => {
            clientsAdapter.upsertOne(state, action.payload);
            state.status = 'IDLE';
        },
        [fetchClientById.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateClient.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateClient.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            clientsAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [updateClient.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export default ordersSlice.reducer;