import { createSelector } from '@reduxjs/toolkit';
import {
    selectCountriesMap,
    selectCurrenciesMap,
    selectIndustriesMap
} from '../../../app/duck/selectors.js';

export const selectHomeDataStatus = state => state.home.dataStatus;
export const selectHomeStatus = state => state.home.status;
export const selectHomeError = state => state.home.error;
export const selectCompanyPorts = state => state.home.company.ports;
export const selectCompanyId = state => state.home.company?._id;

export const selectCurrentCompany = createSelector(
    state => state.home.company,
    selectCurrenciesMap,
    selectIndustriesMap,
    (company, currenciesMap, industriesMap) => ({
        _id: company._id,
        taxNumber: company.taxNumber,
        currency: company.currency ? currenciesMap[company.currency] : null,
        industries: company.industries.map(industry => industriesMap[industry])
    })
);

export const selectCompanyAddresses = createSelector(
    state => state.home.company.addresses,
    selectCountriesMap,
    (addresses, countriesMap) => addresses.map(
        address => ({...address, country: countriesMap[address.country]})
    )
);

export const selectCompanyActiveAddresses = createSelector(
    selectCompanyAddresses,
    addresses => addresses.filter(a => a.active)
);

export const selectCompanyLegalAddress = createSelector(
    selectCompanyActiveAddresses,
    addresses => addresses.find(a => a.legal)
);

export const selectCompanyDefaultAddress = createSelector(
    selectCompanyAddresses,
    addresses => addresses.find(a => a.default)
);

export const selectCompanyAddress = createSelector(
    selectCompanyAddresses,
    (_, addressId) => addressId,
    (addresses, addressId) => addresses.find(a => a._id === addressId)
);

export const selectActiveCompanyBankDetails = createSelector(
    state => state.home.company.bankDetails,
    bankDetails => bankDetails.filter(bd => bd.active)
);