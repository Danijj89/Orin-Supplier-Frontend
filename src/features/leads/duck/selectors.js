import { leadsAdapter } from './slice.js';

export const {
    selectAll,
    selectById,
    selectEntities
} = leadsAdapter.getSelectors(state => state.leads);


export const selectLeadDataStatus = state => state.leads.dataStatus;
export const selectLeadError = state => state.leads.error;