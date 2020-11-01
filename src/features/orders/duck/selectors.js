import { ordersAdapter } from './slice.js';

export const selectOrderDataStatus = state => state.orders.dataStatus;
export const selectOrderStatus = state => state.orders.status;
export const selectOrderError = state => state.orders.error;
export const selectNewOrder = state => state.orders.newOrder;
export const selectCurrentOrderId = state => state.orders.currentOrderId;
export const selectOrdersByIds = (state, ids) =>
    Object.values(state.orders.entities).filter(order => ids.includes(order._id));

export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectEntities: selectOrdersMap
} = ordersAdapter.getSelectors(state => state.orders);