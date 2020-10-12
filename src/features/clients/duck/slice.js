import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    addNewClientAddress, addNewClientContact,
    createClient,
    deleteClientAddress, deleteContact,
    fetchClientById,
    fetchClients, updateAddress,
    updateClient, updateContact, updateDefaultClientAddress
} from './thunks.js';

export const clientsAdapter = createEntityAdapter({
    selectId: client => client._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = clientsAdapter.getInitialState({
    status: 'IDLE',
    error: null
});

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        cleanClientStore: (state, action) => {
            state.status = 'IDLE';
            state.error = null;
        }
    },
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
            state.status = 'FULFILLED';
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
            state.status = 'FULFILLED';
        },
        [updateClient.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [addNewClientAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [addNewClientAddress.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            clientsAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [addNewClientAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteClientAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteClientAddress.fulfilled]: (state, action) => {
            const { clientId, addressId } = action.payload;
            const newAddresses = state.entities[clientId].addresses.filter(add => add._id !== addressId);
            clientsAdapter.updateOne(state, { id: clientId, changes: { addresses: newAddresses }});
            state.status = 'FULFILLED';
        },
        [deleteClientAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateDefaultClientAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateDefaultClientAddress.fulfilled]: (state, action) => {
            const { clientId, addressId } = action.payload;
            const newDefaultAddress = state.entities[clientId].addresses.find(add => add._id === addressId);
            clientsAdapter.updateOne(state, { id: clientId, changes: { defaultAddress: newDefaultAddress }});
            state.status = 'FULFILLED';
        },
        [updateDefaultClientAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateAddress.fulfilled]: (state, action) => {
            const { clientId, ...updatedAddress } = action.payload;
            const updatedAddresses = state.entities[clientId].addresses.map(
                add => add._id === updatedAddress._id ? updatedAddress : add);
            clientsAdapter.updateOne(state, { id: clientId, changes: { addresses: updatedAddresses }});
            state.status = 'FULFILLED';
        },
        [updateAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [addNewClientContact.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [addNewClientContact.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            clientsAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [addNewClientContact.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteContact.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteContact.fulfilled]: (state, action) => {
            const { clientId, contactId } = action.payload;
            const newContacts = state.entities[clientId].contacts.filter(c => c._id !== contactId);
            clientsAdapter.updateOne(state, { id: clientId, changes: { contacts: newContacts }});
            state.status = 'FULFILLED';
        },
        [deleteContact.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateContact.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateContact.fulfilled]: (state, action) => {
            const { clientId, ...updatedContact } = action.payload;
            const updatedContacts = state.entities[clientId].contacts.map(
                c => c._id === updatedContact._id ? updatedContact : c);
            clientsAdapter.updateOne(state, { id: clientId, changes: { contacts: updatedContacts }});
            state.status = 'FULFILLED';
        },
        [updateContact.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanClientStore } = clientsSlice.actions;

export default clientsSlice.reducer;