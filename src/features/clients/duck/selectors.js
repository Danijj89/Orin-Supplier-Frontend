import { clientsAdapter } from './slice.js';

export const {
    selectAll: selectAllClients,
    selectById: selectClientById
} = clientsAdapter.getSelectors(state => state.clients);

export const selectClientStatus = state => state.clients.status;
export const selectError = state => state.clients.error;