import { configureStore } from '@reduxjs/toolkit';
import appReducer from './duck/slice.js';
import homeReducer from '../features/home/duck/slice.js';
import usersReducer from '../features/users/duck/slice.js';
import ordersReducer from '../features/orders/duck/slice.js';
import clientReducer from '../features/clients/duck/slice.js';
import productReducer from '../features/products/duck/slice.js';
import shipmentReducer from '../features/shipments/duck/slice.js';
import documentReducer from '../features/documents/duck/slice.js';
import leadReducer from '../features/leads/duck/slice.js';

export default configureStore({
    reducer: {
        app: appReducer,
        home: homeReducer,
        users: usersReducer,
        clients: clientReducer,
        products: productReducer,
        orders: ordersReducer,
        shipments: shipmentReducer,
        documents: documentReducer,
        leads: leadReducer
    }
});
