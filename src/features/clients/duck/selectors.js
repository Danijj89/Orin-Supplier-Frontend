import { clientsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll: selectAllClients,
    selectById: selectClientById,
    selectEntities: selectClientsMap
} = clientsAdapter.getSelectors(state => state.clients);

export const selectClientDataStatus = state => state.clients.dataStatus;
export const selectClientStatus = state => state.clients.status;
export const selectClientError = state => state.clients.error;

export const selectAllActiveClients = createSelector(
    selectAllClients,
    clients => {
        const activeClients = [];
        for (const client of clients) {
            if (client.active) {
                const newClient = { ...client };
                newClient.addresses = newClient.addresses.filter(a => a.active);
                newClient.contacts = newClient.contacts.filter(a => a.active);
                activeClients.push(newClient);
            }
        }
        return activeClients;
    }
);
export const selectActiveClientsMap = createSelector(
    selectAllActiveClients,
    clients => clients.reduce((map, client) => {
        map[client._id] = client;
        return map;
    }, {})
);

export const selectClientOptions = createSelector(
    (state, props) => state.clients.entities[props.clientId],
    (state, props) => props.addressIds,
    selectAllActiveClients,
    (client, addressIds, activeClients) => {
        if (client && !activeClients.find(c => c._id === client._id)) {
            const newClient = { ...client };
            newClient.addresses = newClient.addresses.filter(a => a.active || addressIds.includes(a._id));
            newClient.contacts = newClient.contacts.filter(a => a.active);
            activeClients.push(newClient);
        }
        return activeClients;
    }
);

export const selectClientActiveAddresses = createSelector(
    (state, id) => state.clients.entities[id].addresses,
    addresses => addresses.filter(a => a.active)
);

export const selectClientAddress = createSelector(
    (state, props) => state.clients.entities[props.clientId],
    (_, props) => props.addressId,
    (client, addressId) => client.addresses.find(a => a._id === addressId)
);


export const selectClientActiveContacts = createSelector(
    selectClientById,
    client => client.contacts.filter(contact => contact.active)
);
export const selectClientActiveContactsMap = createSelector(
    selectClientActiveContacts,
    contacts => contacts.reduce((map, contact) => {
        map[contact._id] = contact;
        return map;
    }, {})
);
export const selectClientDefaultContact = createSelector(
    selectClientActiveContacts,
    contacts => contacts.find(contact => contact.default)
);

export const selectClientOrders = createSelector(
    selectClientById,
    client => client.orders
);

export const selectClientNotes = createSelector(
    selectClientById,
    client => client.notes
);