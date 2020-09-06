
export const selectPOAutocompleteOptions = state => state.orders.autocomplete;
export const selectNewPO = state => state.orders.newPO;
export const selectPOPreviewFile = state => state.orders.previewFileURL;
export const selectPOStatus = state => state.orders.status;
export const selectPOError = state => state.orders.error;
export const selectCurrentPOId = state => state.orders.currentPOId;