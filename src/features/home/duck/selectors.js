import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentCompany = state => state.home.company;
export const selectHomeDataStatus = state => state.home.dataStatus;
export const selectHomeStatus = state => state.home.status;
export const selectHomeError = state => state.home.error;
export const selectCompanyAddresses = state => state.home.company.addresses;

export const selectCompanyActiveAddresses = createSelector(
    selectCompanyAddresses,
    addresses => addresses.filter(a => a.active)
);
export const selectCompanyLegalAddress = createSelector(
    selectCompanyAddresses,
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

export const selectCompanyAddressOptions = createSelector(
    selectCompanyActiveAddresses,
    selectCompanyAddress,
    (addresses, address) => {
        if (address && !address.active) addresses.push(address);
        return addresses;
    }
);

export const selectCompanyPorts = state => state.home.company.ports;
export const selectCompanyId = state => state.home.company?._id;
export const selectActiveCompanyBankDetails = createSelector(
    state => state.home.company.bankDetails,
    bankDetails => bankDetails.filter(bd => bd.active)
);