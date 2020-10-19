import { clientsAdapter } from './slice.js';

export const {
    selectAll: selectAllClients,
    selectById: selectClientById,
    selectEntities: selectClientsMap
} = clientsAdapter.getSelectors(state => state.clients);

export const selectClientStatus = state => state.clients.status;
export const selectClientError = state => state.clients.error;