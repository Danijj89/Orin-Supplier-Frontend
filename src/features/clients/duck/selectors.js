import { clientsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectAppGrants, selectCountriesMap, selectSessionUser, } from 'app/duck/selectors.js';
import { CLIENT_RESOURCE, isOwnClient } from '../../shared/permissions/ClientPermission.js';
import { AccessControl } from 'accesscontrol';

export const {
    selectAll,
    selectById,
    selectEntities
} = clientsAdapter.getSelectors(state => state.clients);

export const selectClientDataStatus = state => state.clients.dataStatus;
export const selectClientStatus = state => state.clients.status;
export const selectClientError = state => state.clients.error;

export const selectAllClients = createSelector(
    selectAll,
    selectCountriesMap,
    (clients, countriesMap) =>
        clients.map(client => ({
            ...client,
            addresses: client.addresses.map(address => ({
                ...address,
                country: countriesMap[address.country]
            }))
        }), {})
);

export const selectClientsMap = createSelector(
    selectAllClients,
    (clients) => clients.reduce((map, client) => {
        map[client._id] = client;
        return map;
    }, {})
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

export const selectClientOwnerById = createSelector(
    selectClientById,
    client => [client?.createdBy, client?.assignedTo]
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

export const selectSessionActiveClients = createSelector(
    selectAllActiveClients,
    selectSessionUser,
    selectAppGrants,
    (clients, { _id: sessionUserId, roles }, grants) => {
        const ac = new AccessControl(grants);
        if (ac.can(roles).readAny(CLIENT_RESOURCE).granted) return clients;
        else if (ac.can(roles).readOwn(CLIENT_RESOURCE).granted)
            return clients.filter(client => isOwnClient(sessionUserId, client));
        else return [];
    }
);





