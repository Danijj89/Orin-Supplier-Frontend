import { ordersAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const selectOrderDataStatus = state => state.orders.dataStatus;
export const selectOrderStatus = state => state.orders.status;
export const selectOrderError = state => state.orders.error;
export const selectCurrentOrderId = state => state.orders.currentOrderId;
export const selectOrdersByIds = (state, ids) =>
    Object.values(state.orders.entities).filter(order => ids.includes(order._id));
export const selectOrderStatusField = (state, id) => state.orders.entities[id].status;
export const selectOrderShipmentIdsField = (state, id) => state.orders.entities[id].shipmentIds;
export const selectOrderFileNameField = (state, id) => state.orders.entities[id].fileName;

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectEntities: selectOrdersMap
} = ordersAdapter.getSelectors(state => state.orders);

export const selectActiveOrdersMap = createSelector(
    selectAllOrders,
    orders => orders.reduce((acc, order) => {
        if (order.active && !order.archived) acc[order._id] = order;
        return acc;
    }, {})
);

export const selectAllActiveOrders = createSelector(
    selectAllOrders,
    orders => orders.filter(order => order.active)
);