import { configureStore } from '@reduxjs/toolkit';
import appReducer from './duck/slice.js';
import homeReducer from '../features/home/duck/slice.js';
import usersReducer from '../features/users/duck/slice.js';
import ordersReducer from '../features/orders/duck/slice.js';
import clientReducer from '../features/clients/duck/slice.js';

export default configureStore({
    reducer: {
        app: appReducer,
        home: homeReducer,
        users: usersReducer,
        clients: clientReducer,
        orders: ordersReducer
    }
});
