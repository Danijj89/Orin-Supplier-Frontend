import { createSelector } from '@reduxjs/toolkit';
import { selectUsersMap } from '../../features/users/duck/selectors.js';

function getOptionsMap(options) {
    return options.reduce((map, option) => {
        map[option.id] = option;
        return map;
    }, {})
}

export const selectCurrentUserId = state => state.app.user._id;
export const selectAppStatus = state => state.app.status;
export const selectAppError = state => state.app.error;
export const selectCurrentUserCompanyId = state => state.app.user?.company;
export const selectSessionUserName = state => state.app.user?.name;
export const selectSessionUser = state => state.app.user;

export const selectCurrentUser = createSelector(
    selectCurrentUserId,
    selectUsersMap,
    (userId, usersMap) => usersMap[userId]
);

export const selectDeliveryMethods = state => state.app.appData.deliveryMethods;
export const selectDeliveryMethodsMap = createSelector(
    selectDeliveryMethods,
    getOptionsMap
);
export const selectDeliveryMethod = createSelector(
    selectDeliveryMethodsMap,
    (_, methodId) => methodId,
    (map, methodId) => map[methodId]
);

export const selectCurrencies = state => state.app.appData.currencies;
export const selectCurrenciesMap = createSelector(
    selectCurrencies,
    getOptionsMap
);


export const selectIncoterms = state => state.app.appData.incoterms;

export const selectExemptionTypes = state => state.app.appData.exemptionTypes;
export const selectSupervisionMethods = state => state.app.appData.supervisionMethods;
export const selectPackageUnits = state => state.app.appData.packageUnits;

export const selectItemUnits = state => state.app.appData.itemUnits;
export const selectItemUnitsMap = createSelector(
    selectItemUnits,
    getOptionsMap
);

export const selectWeightUnits = state => state.app.appData.weightUnits;
export const selectMeasurementUnits = state => state.app.appData.measurementUnits;

export const selectCountries = state => state.app.appData.countries;
export const selectCountriesMap = createSelector(
    selectCountries,
    getOptionsMap
);

export const selectIndustries = state => state.app.appData.industries;
export const selectIndustriesMap = createSelector(
    selectIndustries,
    getOptionsMap
);

export const selectDocumentTypes = state => state.app.appData.documentTypes;
export const selectDocumentTypesMap = createSelector(
    selectDocumentTypes,
    getOptionsMap
);

export const selectOrderStatuses = state => state.app.appData.orderStatuses;
export const selectOrderStatusesMap = createSelector(
    selectOrderStatuses,
    getOptionsMap
);

export const selectBillOfLandingTypes = state => state.app.appData.billOfLandingTypes;
export const selectShipmentStatuses = state => state.app.appData.shipmentStatuses;

export const selectDefaultRowItem = createSelector(
    selectItemUnits,
    selectPackageUnits,
    (itemUnits, packageUnits) => ({
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
        custom1: '',
        custom2: '',
        ciCustom1: '',
        ciCustom2: '',
        plCustom1: '',
        plCustom2: ''
    })
);
