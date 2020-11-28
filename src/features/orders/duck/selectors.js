import { ordersAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectEntities: selectOrdersMap
} = ordersAdapter.getSelectors(state => state.orders);

export const selectOrderDataStatus = state => state.orders.dataStatus;
export const selectOrderStatus = state => state.orders.status;
export const selectOrderError = state => state.orders.error;
export const selectCurrentOrderId = state => state.orders.currentOrderId;
export const selectOrderStatusField = (state, id) => state.orders.entities[id]?.status;
export const selectOrderShipmentIdsField = (state, id) => state.orders.entities[id]?.shipmentIds;
export const selectOrderFileNameField = (state, id) => state.orders.entities[id]?.fileName;

export const selectAllActiveOrders = createSelector(
    selectAllOrders,
    orders => orders.filter(order => order.active)
);

export const selectAllActiveAndUnarchivedOrders = createSelector(
    selectAllOrders,
    orders => orders.filter(order => order.active && !order.archived)
);

export const selectActiveOrdersMap = createSelector(
    selectAllActiveOrders,
    orders => orders.reduce((map, order) => {
        map[order._id] = order;
        return map;
    }, {})
);

export const selectShipmentShellClientIdToActiveOrdersMap = createSelector(
    selectAllActiveAndUnarchivedOrders,
    orders => orders.reduce((map, order) => {
        const enhancedOrder = { ...order, selected: false };
        if (map.hasOwnProperty(enhancedOrder.to)) map[enhancedOrder.to].push(enhancedOrder);
        else map[enhancedOrder.to] = [enhancedOrder];
        return map;
    }, {})
);

