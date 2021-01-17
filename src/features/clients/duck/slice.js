import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
    createClientAddress, createClientContact,
    createClient, deleteClient,
    deleteClientAddress, deleteContact,
    fetchClientById,
    fetchClients, updateAddress,
    updateClient, updateContact, updateDefaultClientAddress, updateDefaultClientContact
} from './thunks.js';

export const clientsAdapter = createEntityAdapter({
    selectId: client => client._id,
    sortComparer: (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
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
        cleanClientState: (state, action) => {
            state.dataStatus = 'IDLE';
            state.status = 'IDLE';
            state.error = null;
        },
        addClient: (state, action) => {
            clientsAdapter.upsertOne(state, action.payload);
        },
        resetClientStatus: (state) => {
            state.status = 'IDLE';
        }
    },
    extraReducers: {
        [fetchClients.pending]: (state, action) => {
            state.dataStatus = 'PENDING';
        },
        [fetchClients.fulfilled]: (state, action) => {
            clientsAdapter.upsertMany(state, action.payload);
            state.dataStatus = 'FULFILLED';
        },
        [fetchClients.rejected]: (state, action) => {
            state.dataStatus = 'REJECTED';
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
        [createClientAddress.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createClientAddress.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            clientsAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [createClientAddress.rejected]: (state, action) => {
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
            const newAddresses = state.entities[clientId].addresses.map(address => {
                if (address.default) address.default = false;
                else if (address._id === addressId) address.default = true;
                return address;
            })
            clientsAdapter.updateOne(state, { id: clientId, changes: { addresses: newAddresses } });
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
            const { clientId, addressId, update } = action.payload;
            const updatedAddresses = state.entities[clientId].addresses.map(
                add => add._id === addressId ? { ...add, ...update } : add);
            clientsAdapter.updateOne(state, { id: clientId, changes: { addresses: updatedAddresses } });
            state.status = 'FULFILLED';
        },
        [updateAddress.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [createClientContact.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [createClientContact.fulfilled]: (state, action) => {
            const { _id: id, ...changes } = action.payload;
            clientsAdapter.updateOne(state, { id, changes });
            state.status = 'FULFILLED';
        },
        [createClientContact.rejected]: (state, action) => {
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
            const { clientId, contactId, update } = action.payload;
            const updatedContacts = state.entities[clientId].contacts.map(
                contact => contact._id === contactId ? { ...contact, ...update } : contact);
            clientsAdapter.updateOne(state, { id: clientId, changes: { contacts: updatedContacts } });
            state.status = 'FULFILLED';
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
            state.status = 'FULFILLED';
        },
        [deleteClient.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
        [updateDefaultClientContact.pending]: (state, action) => {
            state.status = 'PENDING';
        },
        [updateDefaultClientContact.fulfilled]: (state, action) => {
            const { clientId, contactId } = action.payload;
            const newContacts = state.entities[clientId].contacts.map(contact => {
                if (contact.default) contact.default = false;
                else if (contact._id === contactId) contact.default = true;
                return contact;
            })
            clientsAdapter.updateOne(state, { id: clientId, changes: { contacts: newContacts } });
            state.status = 'FULFILLED';
        },
        [updateDefaultClientContact.rejected]: (state, action) => {
            state.status = 'REJECTED';
            state.error = action.payload.message;
        },
    }
});

export const { cleanClientState, addClient, resetClientStatus } = clientsSlice.actions;

export default clientsSlice.reducer;