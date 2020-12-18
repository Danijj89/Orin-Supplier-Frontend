import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createResource, fetchResources } from './thunks.js';

export const resourcesAdapter = createEntityAdapter({
    selectId: resource => resource._id,
    sortComparer: (a, b) => a._id.localeCompare(b._id)
});

const initialState = resourcesAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        cleanResourceState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchResources.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchResources.fulfilled]: (state, action) => {
            resourcesAdapter.setAll(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchResources.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        },
        [createResource.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createResource.fulfilled]: (state, action) => {
            resourcesAdapter.upsertOne(state, action.payload);
            state.status = 'FULFILLED';
        },
        [createResource.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanResourceState } = resourcesSlice.actions;

export default resourcesSlice.reducer;