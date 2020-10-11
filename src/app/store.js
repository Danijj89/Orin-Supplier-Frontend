import { configureStore } from '@reduxjs/toolkit';
import appReducer from './duck/slice.js';
import ordersReducer from '../features/orders/duck/slice.js';
import commercialInvoiceReducer from '../features/commercial_invoice/duck/slice.js';
import packingListReducer from '../features/packing_list/duck/slice.js';
import shipmentReducer from '../features/shipments/duck/slice.js';
import clientReducer from '../features/clients/duck/slice.js';

export default configureStore({
  reducer: {
    app: appReducer,
    clients: clientReducer,
    orders: ordersReducer,
    ci: commercialInvoiceReducer,
    pl: packingListReducer,
    shipments: shipmentReducer
  }
});
