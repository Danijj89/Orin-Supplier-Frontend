import { createSelector } from '@reduxjs/toolkit';
import { selectUsersMap } from '../../features/users/duck/selectors.js';
import { getOptionId } from '../utils/options/getters.js';

function getOptionsMap(options) {
    return options.reduce((map, option) => {
        map[option.id] = option;
        return map;
    }, {});
}

export const selectCurrentUserId = (state) => state.app.user._id;
export const selectAppStatus = (state) => state.app.status;
export const selectAppError = (state) => state.app.error;
export const selectCurrentUserCompanyId = (state) => state.app.user?.company;
export const selectSessionUserName = (state) => state.app.user?.name;
export const selectSessionUser = (state) => state.app.user;

export const selectCurrentUser = createSelector(
    selectCurrentUserId,
    selectUsersMap,
    (userId, usersMap) => usersMap[userId]
);

export const selectIncoterms = (state) => state.app.appData.incoterms;
export const selectExemptionTypes = (state) => state.app.appData.exemptionTypes;
export const selectSupervisionMethods = (state) =>
    state.app.appData.supervisionMethods;
export const selectBillOfLandingTypes = (state) =>
    state.app.appData.billOfLandingTypes;
export const selectBillOfLandingTypesMap = createSelector(
    selectBillOfLandingTypes,
    getOptionsMap
);

export const selectDeliveryMethods = (state) =>
    state.app.appData.deliveryMethods;
export const selectDeliveryMethodsMap = createSelector(
    selectDeliveryMethods,
    getOptionsMap
);

export const selectCurrencies = (state) => state.app.appData.currencies;
export const selectCurrenciesMap = createSelector(
    selectCurrencies,
    getOptionsMap
);

export const selectPackageUnits = (state) => state.app.appData.packageUnits;
export const selectPackageUnitsMap = createSelector(
    selectPackageUnits,
    getOptionsMap
);

export const selectItemUnits = (state) => state.app.appData.itemUnits;
export const selectItemUnitsMap = createSelector(
    selectItemUnits,
    getOptionsMap
);

export const selectWeightUnits = (state) => state.app.appData.weightUnits;
export const selectWeightUnitsMap = createSelector(
    selectWeightUnits,
    getOptionsMap
);

export const selectMeasurementUnits = (state) =>
    state.app.appData.measurementUnits;
export const selectMeasurementUnitsMap = createSelector(
    selectMeasurementUnits,
    getOptionsMap
);

export const selectCountries = (state) => state.app.appData.countries;
export const selectCountriesMap = createSelector(
    selectCountries,
    getOptionsMap
);

export const selectIndustries = (state) => state.app.appData.industries;
export const selectIndustriesMap = createSelector(
    selectIndustries,
    getOptionsMap
);

export const selectDocumentTypes = (state) => state.app.appData.documentTypes;
export const selectDocumentTypesMap = createSelector(
    selectDocumentTypes,
    getOptionsMap
);

export const selectOrderStatuses = (state) => state.app.appData.orderStatuses;
export const selectOrderStatusesMap = createSelector(
    selectOrderStatuses,
    getOptionsMap
);

export const selectShipmentStatuses = (state) =>
    state.app.appData.shipmentStatuses;
export const selectShipmentStatusesMap = createSelector(
    selectShipmentStatuses,
    getOptionsMap
);

export const selectContainerTypes = (state) => state.app.appData.containerTypes;

export const selectSalesStatuses = (state) => state.app.appData.salesStatuses;
export const selectSalesStatusesMap = createSelector(
    selectSalesStatuses,
    getOptionsMap
);

export const selectLeadTypes = (state) => state.app.appData.leadTypes;
export const selectLeadTypesMap = createSelector(
    selectLeadTypes,
    getOptionsMap
);

export const selectLeadPotentials = (state) => state.app.appData.leadPotentials;
export const selectLeadPotentialsMap = createSelector(
    selectLeadPotentials,
    getOptionsMap
);

export const selectDefaultRowItem = createSelector(
    selectItemUnits,
    selectPackageUnits,
    selectCurrencies,
    (itemUnits, packageUnits, currencies) => ({
        _id: null,
        product: null,
        order: null,
        ref: '',
        description: '',
        localD: '',
        hsc: '',
        quantity: 0,
        unit: itemUnits[0],
        price: 0,
        total: 0,
        package: 0,
        pUnit: packageUnits[0],
        netW: 0,
        grossW: 0,
        dim: 0,
        currency: currencies[0],
        ciCustom1: '',
        ciCustom2: '',
        plCustom1: '',
        plCustom2: '',
    })
);

export const selectDefaultConsolidationRowItem = createSelector(
    (_, props) => props,
    selectItemUnits,
    selectCurrencies,
    selectPackageUnits,
    (props, itemUnits, currencies, packageUnits) => ({
        _id: null,
        hsc: '',
        localD: '',
        quantity: 0,
        unit: itemUnits[0],
        price: 0,
        total: 0,
        currency: props?.currency || currencies[0],
        coo: props?.countryOfOrigin, // country of origin
        fdc: null, // final destination country
        dop: '', // domestic origin of product (city/region)

        package: 0,
        pUnit: packageUnits[0],
        netW: 0, // net weight
        grossW: 0, // gross weight
        dim: 0,
        description: '',
        dg: false,
    })
);

export const selectDefaultContainerRowItem = createSelector(
    selectContainerTypes,
    (containerTypes) => ({
        type: getOptionId(containerTypes[0]),
        quantity: 0,
    })
);
