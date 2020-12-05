import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createLead,
    createLeadAddress,
    deleteLeadAddress,
    fetchLeads,
    updateLead, updateLeadAddress,
    updateLeadDefaultAddress
} from './thunks.js';


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
        },
        [createLeadAddress.pending]: (state) => {
            state.status = 'PENDING';
        },
        [createLeadAddress.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            leadsAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [createLeadAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteLeadAddress.pending]: (state) => {
            state.status = 'PENDING';
        },
        [deleteLeadAddress.fulfilled]: (state, action) => {
            const { leadId, addressId } = action.payload;
            const newAddresses = state.entities[leadId].addresses.filter(
                a => a._id !== addressId);
            leadsAdapter.updateOne(state, {
                id: leadId,
                changes: { addresses: newAddresses }
            });
            state.status = 'IDLE';
        },
        [deleteLeadAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateLeadDefaultAddress.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateLeadDefaultAddress.fulfilled]: (state, action) => {
            const { leadId, addressId } = action.payload;
            const newAddresses = state.entities[leadId].addresses.map(address => {
                if (address.default) address.default = false;
                else if (address._id === addressId) address.default = true;
                return address;
            })
            leadsAdapter.updateOne(state, { id: leadId, changes: { addresses: newAddresses } });
            state.status = 'IDLE';
        },
        [updateLeadDefaultAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateLeadAddress.pending]: (state) => {
            state.status = 'PENDING';
        },
        [updateLeadAddress.fulfilled]: (state, action) => {
            const { leadId, addressId, update } = action.payload;
            const updatedAddresses = state.entities[leadId].addresses.map(
                add => add._id === addressId ? { ...add, ...update } : add);
            leadsAdapter.updateOne(state, { id: leadId, changes: { addresses: updatedAddresses } });
            state.status = 'IDLE';
        },
        [updateLeadAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanLeadState } = leadsSlice.actions;

export default leadsSlice.reducer;