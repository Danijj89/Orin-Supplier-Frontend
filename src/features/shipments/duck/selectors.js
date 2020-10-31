import { shipmentsAdapter } from './slice.js';

export const selectShipmentStatus = state => state.shipments.status;
export const selectShipmentDataStatus = state => state.shipments.dataStatus;
export const selectShipmentError = state => state.shipments.error;
export const selectCurrentShipmentId = state => state.shipments.currentShipmentId;
export const selectOrderShipmentItemMap = state => {
    const resultMap = Object.values(state.orders.entities)
        .filter(order => order.active && !order.fulfilled).reduce((acc, order) => {
            acc[order._id] = [];
            return acc;
        } , {});
    Object.values(state.shipments.entities).forEach(shipment => {
        shipment.items.forEach(item => {
            if (resultMap.hasOwnProperty(item.order))
                resultMap[item.order].push({ shipment: shipment._id, quantity: item.quantity });
        })
    });
    return resultMap;
};

export const {
    selectAll: selectAllShipments,
    selectById: selectShipmentById
} = shipmentsAdapter.getSelectors(state => state.shipments);