
export const selectOrderSteps = state => state.orders.steps;
export const selectOrderActiveStep = state => state.orders.activeStep;
export const selectPOAutocompleteOptions = state => state.orders.autocomplete;
export const selectNewOrderDetails = state => state.orders.newOrder.orderDetails;
export const selectNewOrderProductInfo = state => state.orders.newOrder.orderProductInfo;
export const selectPreviewFile = state => state.orders.previewFileURL;
export const selectStatus = state => state.orders.status;
export const selectError = state => state.orders.error;