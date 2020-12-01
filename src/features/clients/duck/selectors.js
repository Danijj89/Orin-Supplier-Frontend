import { clientsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectCountriesMap } from '../../../app/duck/selectors.js';
import { selectUsersMap } from '../../users/duck/selectors.js';
import { selectAllActiveOrders } from '../../orders/duck/selectors.js';

export const {
    selectAll,
    selectById,
    selectEntities
} = clientsAdapter.getSelectors(state => state.clients);

export const selectClientDataStatus = state => state.clients.dataStatus;
export const selectClientStatus = state => state.clients.status;
export const selectClientError = state => state.clients.error;

export const selectClientsMap = createSelector(
    selectEntities,
    selectUsersMap,
    selectCountriesMap,
    (clientsMap, usersMap, countriesMap) =>
        Object.entries(clientsMap).reduce(
            (map, [id, client]) => {
                map[id] = {
                    ...client,
                    assignedTo: usersMap[client.assignedTo],
                    createdBy: usersMap[client.assignedTo],
                    addresses: client.addresses.map(address => ({
                        ...address,
                        country: countriesMap[address.country]
                    }))
                };
                return map;
            }, {})
);

export const selectAllClients = createSelector(
    selectClientsMap,
    (clientsMap) => Object.values(clientsMap)
);

export const selectClientById = createSelector(
    selectClientsMap,
    (state, { clientId }) => clientId,
    (clientsMap, clientId) => clientsMap[clientId]
);

export const selectClientAddress = createSelector(
    selectClientsMap,
    (_, props) => props,
    (clientsMap, { clientId, addressId }) =>
        clientsMap[clientId]?.addresses.find(a => a._id === addressId)
);

export const selectClientNotes = createSelector(
    selectClientById,
    client => client.notes
);


export const selectAllActiveClients = createSelector(
    selectAllClients,
    clients => clients.filter(c => c.active).map(
        client => ({
            ...client,
            addresses: client.addresses.filter(a => a.active),
            contacts: client.contacts.filter(a => a.active)
        })
    )
);

export const selectActiveClientsMap = createSelector(
    selectAllActiveClients,
    clients => clients.reduce((map, client) => {
        map[client._id] = client;
        return map;
    }, {})
);

export const selectActiveClientById = createSelector(
    selectActiveClientsMap,
    (state, { clientId }) => clientId,
    (clientsMap, clientId) => clientsMap[clientId]
);

export const selectClientActiveAddresses = createSelector(
    selectActiveClientById,
    client => client.addresses
);

export const selectClientActiveContacts = createSelector(
    selectActiveClientById,
    client => client.contacts
);


export const selectClientOrders = createSelector(
    selectAllActiveOrders,
    (state, { clientId }) => clientId,
    (orders, clientId) => orders.filter(order => order.to === clientId)
);






