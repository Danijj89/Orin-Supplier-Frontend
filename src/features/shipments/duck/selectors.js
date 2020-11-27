import { shipmentsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllActiveOrders } from '../../orders/duck/selectors.js';

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
                if (resultMap.hasOwnProperty(item.order))
                    resultMap[item.order].push({ shipment: shipment._id, quantity: item.quantity});
            })
        );
        return resultMap;
    }
);

export const selectShipmentOrderIds = createSelector(
    selectShipmentById,
    shipment => shipment?.items.reduce((acc, item) => {
        if (!acc.includes(item.order)) acc.push(item.order);
        return acc;
    }, [])
);

export const selectShipmentCommercialInvoices = createSelector(
    (state, id) => state.shipments.entities[id].documents,
    documents => documents.filter(doc => doc.type === 'CI' && doc.active)
);

