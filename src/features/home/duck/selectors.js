import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentCompany = state => state.home.company;
export const selectHomeDataStatus = state => state.home.dataStatus;
export const selectHomeStatus = state => state.home.status;
export const selectHomeError = state => state.home.error;

export const selectCompanyActiveAddresses = createSelector(
    state => state.home.company.addresses,
    addresses => addresses.filter(a => a.active)
);
export const selectCompanyLegalAddress = createSelector(
    state => state.home.company.addresses,
    addresses => addresses.find(a => a.legal)
);
export const selectCompanyDefaultAddress = createSelector(
    state => state.home.company.addresses,
    addresses => addresses.find(a => a.default)
);
export const selectCompanyAddressOptions = createSelector(
    (state, addressId) =>
        state.home.company.addresses.find(a => a._id === addressId),
    selectCompanyActiveAddresses,
    (address, activeAddresses) => {
        if (address && !activeAddresses.find(a => a._id === address._id))
            activeAddresses.push(address);
        return activeAddresses;
    }
);

export const selectCompanyPorts = state => state.home.company.ports;
export const selectCompanyId = state => state.home.company?._id;
export const selectActiveCompanyBankDetails = createSelector(
    state => state.home.company.bankDetails,
    bankDetails => bankDetails.filter(bd => bd.active)
);