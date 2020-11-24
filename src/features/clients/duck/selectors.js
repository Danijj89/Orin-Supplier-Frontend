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
export const selectClientActiveAddresses = createSelector(
    (state, id) => state.clients.entities[id].addresses,
    addresses => addresses.filter(a => a.active)
);
export const selectActiveClients = createSelector(
    selectAllClients,
    clients => clients.filter(c => c.active)
);

export const selectActiveClientsMap = createSelector(
    selectActiveClients,
    clients => clients.reduce((map, client) => {
        map[client._id] = client;
        return map;
    }, {})
);