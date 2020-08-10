import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/slice.js';
import ordersReducer from '../features/orders/duck/slice.js';

export default configureStore({
  reducer: {
    home: homeReducer,
    orders: ordersReducer
  },
});
