
export const selectPOAutocompleteOptions = state => state.orders.autocomplete;
export const selectNewOrder = state => state.orders.newOrder;
export const selectOrderStatus = state => state.orders.status;
export const selectOrderError = state => state.orders.error;
export const selectCurrentOrderId = state => state.orders.currentOrderId;
export const selectDefaultRowValues = state => state.orders.defaultRowValues;