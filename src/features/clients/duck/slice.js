import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    addNewClientAddress, addNewClientContact,
    createClient, deleteClient,
    deleteClientAddress, deleteContact,
    fetchClientById,
    fetchClients, updateAddress,
    updateClient, updateClientNotes, updateContact, updateDefaultClientAddress
} from './thunks.js';

export const clientsAdapter = createEntityAdapter({
    selectId: client => client._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = clientsAdapter.getInitialState({
    dataStatus: 'IDLE',
    status: 'IDLE',
    error: null
});

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        cleanClientError: (state, action) => {
            state.dataStatus = 'IDLE';
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
            state.dataStatus = 'FULFILLED';
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
            state.status = 'IDLE';
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
            state.status = 'IDLE';
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
            state.status = 'IDLE';
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
            const newAddresses = state.entities[clientId].addresses.map(
                add => {
                    if (add._id === addressId) add.active = false;
                    return add;
                });
            clientsAdapter.updateOne(state, { id: clientId, changes: { addresses: newAddresses } });
            state.status = 'IDLE';
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
            clientsAdapter.updateOne(state, { id: clientId, changes: { defaultAddress: newDefaultAddress } });
            state.status = 'IDLE';
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
            clientsAdapter.updateOne(state, { id: clientId, changes: { addresses: updatedAddresses } });
            state.status = 'IDLE';
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
            state.status = 'IDLE';
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
            const newContacts = state.entities[clientId].contacts.map(
                contact => {
                    if (contact._id === contactId) contact.active = false;
                    return contact;
                });
            clientsAdapter.updateOne(state, { id: clientId, changes: { contacts: newContacts } });
            state.status = 'IDLE';
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
            clientsAdapter.updateOne(state, { id: clientId, changes: { contacts: updatedContacts } });
            state.status = 'IDLE';
        },
        [updateContact.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [deleteClient.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [deleteClient.fulfilled]: (state, action) => {
            clientsAdapter.updateOne(state, { id: action.payload, changes: { active: false } });
            state.status = 'IDLE';
        },
        [deleteClient.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateClientNotes.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateClientNotes.fulfilled]: (state, action) => {
            const { id, notes: changes } = action.payload;
            clientsAdapter.updateOne(state, { id, changes });
            state.status = 'IDLE';
        },
        [updateClientNotes.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        }
    }
});

export const { cleanClientError } = clientsSlice.actions;

export default clientsSlice.reducer;