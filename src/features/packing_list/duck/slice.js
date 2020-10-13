import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { startNewPL, submitPL, submitPLForPreview } from './thunks.js';

const packingListAdapter = createEntityAdapter({
    selectId: pl => pl._id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = packingListAdapter.getInitialState({
    status: 'IDLE',
    error: null,
    autocomplete: {
        itemsRef: [],
        itemDescriptionMap: {}
    },
    newPL: null,
    previewFileURL: null
});

const packingListSlice = createSlice({
    name: 'pl',
    initialState,
    reducers: {
        submitPLDetails: (state, action) => {
            const { plRef } = action.payload;
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPL[key] = value;
            }
        },
        submitPLTableInfo: (state, action) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state.newPL[key] = value;
            }
        }
    },
    extraReducers: {
        [startNewPL.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [startNewPL.fulfilled]: (state, action) => {
            const { newPL, ...rest } = action.payload;
            state.autocomplete = rest;
            state.newPL = newPL;
            state.status = 'IDLE';
        },
        [startNewPL.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitPLForPreview.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitPLForPreview.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.previewFileURL = action.payload;
        },
        [submitPLForPreview.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
        [submitPL.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [submitPL.fulfilled]: (state, action) => {
            state.status = 'IDLE';
            state.newPL = null;
        },
        [submitPL.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.error.message;
        },
    }
});

export const { submitPLDetails, submitPLTableInfo } = packingListSlice.actions;

export default packingListSlice.reducer;