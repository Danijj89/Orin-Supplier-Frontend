import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createLead, fetchLeads, updateLead } from './thunks.js';


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
        },
        [createLead.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createLead.fulfilled]: (state, action) => {
            leadsAdapter.upsertOne(state, action.payload);
            state.status = 'IDLE';
        },
        [createLead.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateLead.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateLead.fulfilled]: (state, action) => {
            const { leadId: id, update: changes } = action.payload;
            if (changes.contact) {
                const prevContact = state.entities[id].contact;
                changes.contact = { ...prevContact, ...changes.contact };
            }
            leadsAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [updateLead.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanLeadState } = leadsSlice.actions;

export default leadsSlice.reducer;