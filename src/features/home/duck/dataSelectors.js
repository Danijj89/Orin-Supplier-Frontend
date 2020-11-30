import { createSelector } from '@reduxjs/toolkit';
import { selectCompanyLegalAddress, selectCurrentCompany } from './selectors.js';
import { selectCurrenciesMap } from '../../../app/duck/selectors.js';
import { LOCALE } from '../../../app/utils/constants.js';


export const selectCompanyDetails = createSelector(
    selectCurrentCompany,
    selectCompanyLegalAddress,
    selectCurrenciesMap,
    (company, legalAddress, currenciesMap) => ({
        taxNumber: company.taxNumber,
        currency: company.currency ? currenciesMap[company.currency].label[LOCALE] : null,
        industries: company.industries,
        email: legalAddress.email,
        phone: legalAddress.phone,
        name: legalAddress.name
    })
);