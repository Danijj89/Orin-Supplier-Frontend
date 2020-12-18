import { leadsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import {
    selectCountriesMap,
    selectLeadPotentialsMap,
    selectLeadTypesMap,
    selectSalesStatusesMap
} from '../../../app/duck/selectors.js';

export const {
    selectAll,
    selectById,
    selectEntities
} = leadsAdapter.getSelectors(state => state.leads);

export const selectLeadDataStatus = state => state.leads.dataStatus;
export const selectLeadError = state => state.leads.error;

export const selectAllLeads = createSelector(
    selectAll,
    selectCountriesMap,
    selectSalesStatusesMap,
    selectLeadTypesMap,
    selectLeadPotentialsMap,
    (leads, countriesMap, salesStatusesMap, leadTypesMap, leadPotentialsMap) =>
        leads.map(lead => ({
            ...lead,
            salesStatus: salesStatusesMap[lead.salesStatus],
            leadType: leadTypesMap[lead.leadType],
            leadPotential: leadPotentialsMap[lead.leadPotential],
            addresses: lead.addresses.map(
                address => ({
                    ...address,
                    country: countriesMap[address.country]
                }))
        }))
);

export const selectLeadsMap = createSelector(
    selectAllLeads,
    (leads) =>
        leads.reduce((map, lead) => {
            map[lead._id] = lead;
            return map;
        }, {})
);

export const selectLeadById = createSelector(
    selectLeadsMap,
    (_, { leadId }) => leadId,
    (leadsMap, leadId) => leadsMap[leadId]
);

export const selectLeadAddresses = createSelector(
    selectLeadById,
    lead => lead.addresses
);