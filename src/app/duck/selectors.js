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
export const selectBillOfLandingTypes = state => state.app.appData.billOfLandingTypes;
export const selectShipmentStatuses = state => state.app.appData.shipmentStatuses;
