export const selectCurrentUserId = state => state.app.user._id;
export const selectAppStatus = state => state.app.status;
export const selectAppError = state => state.app.error;
export const selectCurrentUserCompanyId = state => state.app.user?.company;
export const selectCurrentUser = state => state.app.user;

export const selectDeliveryMethods = state => state.app.appData.deliveryMethods;
export const selectCurrencies = state => state.app.appData.currencies;
export const selectIncoterms = state => state.app.appData.incoterms;
export const selectExemptionTypes = state => state.app.appData.exemptionTypes;
export const selectSupervisionMethods = state => state.app.appData.supervisionMethods;
export const selectPackageUnits = state => state.app.appData.packageUnits;