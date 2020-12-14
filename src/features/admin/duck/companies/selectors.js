import { companiesAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectCountriesMap, selectCurrenciesMap, selectIndustriesMap } from '../../../../app/duck/selectors.js';

export const {
    selectAll,
    selectEntities
} = companiesAdapter.getSelectors(state => state.companies);

export const selectCompanyDataStatus = state => state.companies.dataStatus;
export const selectCompanyError = state => state.companies.error;

export const selectCompaniesMap = createSelector(
    selectEntities,
    selectCountriesMap,
    selectCurrenciesMap,
    selectIndustriesMap,
    (companiesMap, countriesMap, currenciesMap, industriesMap) =>
        Object.entries(companiesMap).reduce((map, [id, company]) => {
            map[id] = {
                ...company,
                currency: company.currency ? currenciesMap[company.currency] : null,
                industries: company.industries.map(industry => industriesMap[industry]),
                addresses: company.addresses.map(address => ({
                    ...address,
                    country: countriesMap[address.country]
                }))
            };
            return map;
        }, {})
);

export const selectAllCompanies = createSelector(
    selectCompaniesMap,
    companiesMap => Object.values(companiesMap)
);