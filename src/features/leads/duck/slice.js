import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { shipmentsAdapter } from '../../shipments/duck/slice.js';
import { fetchLeads } from './thunks.js';


export const leadsAdapter = createEntityAdapter({
    selectId: lead => lead._id,
    sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
});

const initialState = leadsAdapter.getInitialState({
   dataStatus: 'IDLE',
   status: 'IDLE',
   error: null
});

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        cleanLeadState: (state) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        }
    },
    extraReducers: {
        [fetchLeads.pending]: (state) => {
            state.dataStatus = 'PENDING';
        },
        [fetchLeads.fulfilled]: (state, action) => {
            leadsAdapter.upsertMany(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchLeads.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanLeadState } = leadsSlice.actions;

export default leadsSlice.reducer;