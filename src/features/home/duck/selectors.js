import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentCompany = state => state.home.company;
export const selectHomeStatus = state => state.home.status;
export const selectHomeError = state => state.home.error;
export const selectCompanyActiveAddresses = createSelector(
    state => state.home.company.addresses,
    addresses => addresses.filter(a => a.active)
);
export const selectCompanyPorts = state => state.home.company.ports;