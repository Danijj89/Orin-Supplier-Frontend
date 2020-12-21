import { companiesAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectCountriesMap, selectCurrenciesMap, selectIndustriesMap } from '../../../../app/duck/selectors.js';

export const {
    selectAll,
    selectEntities
} = companiesAdapter.getSelectors(state => state.companies);

export const selectCompanyDataStatus = state => state.companies.dataStatus;
export const selectCompanyError = state => state.companies.error;

export const selectAllCompanies = createSelector(
    selectAll,
    selectCountriesMap,
    selectCurrenciesMap,
    selectIndustriesMap,
    (companies, countriesMap, currenciesMap, industriesMap) => companies.map(company => ({
        ...company,
        currency: company.currency ? currenciesMap[company.currency] : null,
        industries: company.industries.map(industry => industriesMap[industry]),
        addresses: company.addresses.map(address => ({
            ...address,
            country: countriesMap[address.country]
        }))
    }))
);

export const selectCompaniesMap = createSelector(
    selectAllCompanies,
    companies => companies.reduce((map, company) => {
            map[company._id] = company;
            return map;
        }, {})
);

