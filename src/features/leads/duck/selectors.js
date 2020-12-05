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

export const selectLeadsMap = createSelector(
    selectEntities,
    selectCountriesMap,
    selectSalesStatusesMap,
    selectLeadTypesMap,
    selectLeadPotentialsMap,
    (leadsMap, countriesMap, salesStatusesMap, leadTypesMap, leadPotentialsMap) =>
        Object.entries(leadsMap).reduce((map, [id, lead]) => {
            map[id] = {
                ...lead,
                salesStatus: salesStatusesMap[lead.salesStatus],
                leadType: leadTypesMap[lead.leadType],
                leadPotential: leadPotentialsMap[lead.leadPotential],
                addresses: lead.addresses.map(
                    address => ({
                        ...address,
                        country: countriesMap[address.country]
                    }))
            }
            return map;
        }, {})
);

export const selectAllLeads = createSelector(
    selectLeadsMap,
    leadsMap => Object.values(leadsMap)
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