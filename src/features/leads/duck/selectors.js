import { leadsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import {
    selectAppGrants,
    selectCountriesMap,
    selectLeadPotentialsMap,
    selectLeadTypesMap,
    selectSalesStatusesMap, selectSessionUser
} from '../../../app/duck/selectors.js';
import { AccessControl } from 'accesscontrol';
import { isOwnLead, LEAD_RESOURCE } from '../../shared/permissions/LeadPermission.js';

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


export const selectLeadOwnersById = createSelector(
    selectLeadById,
    lead => [lead?.createdBy, lead?.assignedTo]
);

export const selectSessionActiveLeads = createSelector(
    selectAllLeads,
    selectSessionUser,
    selectAppGrants,
    (leads, { _id: sessionUserId, roles }, grants) => {
        const ac = new AccessControl(grants);
        if (ac.can(roles).readAny(LEAD_RESOURCE).granted) return leads;
        else if (ac.can(roles).readOwn(LEAD_RESOURCE).granted)
            return leads.filter(client => isOwnLead(sessionUserId, client));
        else return [];
    }
);