import { shipmentsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllActiveOrders, selectOrdersMap } from '../../orders/duck/selectors.js';

export const {
    selectAll: selectAllShipments,
    selectById: selectShipmentById
} = shipmentsAdapter.getSelectors(state => state.shipments);

export const selectShipmentStatus = state => state.shipments.status;
export const selectShipmentDataStatus = state => state.shipments.dataStatus;
export const selectShipmentError = state => state.shipments.error;
export const selectCurrentShipmentId = state => state.shipments.currentShipmentId;
export const selectShipmentDocumentsField = (state, id) => state.shipments.entities[id].documents;

export const selectOrderToShipmentItemsQuantityMap = createSelector(
    selectAllActiveOrders,
    selectAllShipments,
    (orders, shipments) => {
        const resultMap = orders.reduce((map, order) => {
            map[order._id] = [];
            return map;
        }, {});
        shipments.forEach(shipment =>
            shipment.items.forEach(item => {
                if (item.order && resultMap.hasOwnProperty(item.order))
                    resultMap[item.order].push({ shipment: shipment._id, quantity: item.quantity});
            })
        );
        return resultMap;
    }
);

export const selectShipmentOrders = createSelector(
    selectOrdersMap,
    selectShipmentById,
    (ordersMap, shipment) => {
        if (!shipment || Object.keys(ordersMap).length === 0) return null;
        const shipmentOrdersMap = shipment.items.reduce((map, item) => {
            if (item.order && !map.hasOwnProperty(item.order)) map[item.order] = ordersMap[item.order];
            return map;
        }, {});
        return Object.values(shipmentOrdersMap);
    }
);

export const selectShipmentCommercialInvoices = createSelector(
    (state, id) => state.shipments.entities[id].documents,
    documents => documents.filter(doc => doc.type === 'CI' && doc.active)
);

