import { createSelector } from '@reduxjs/toolkit';
import {
    selectActiveOrdersMap,
    selectAllActiveAndUnarchivedOrders,
    selectAllActiveSplits,
} from 'features/orders/duck/selectors.js';
import { selectAllActiveClients } from 'features/clients/duck/selectors.js';
import { selectAllShipments, selectShipmentById } from 'features/shipments/duck/selectors.js';

export const selectClientsSplitsMap = createSelector(
    selectAllActiveAndUnarchivedOrders,
    selectAllActiveClients,
    (orders, clients) => {
        const clientsSplitsMap = clients.reduce((map, client) => {
            map[client._id] = [];
            return map;
        }, {});
        orders.forEach(order => {
            if (clientsSplitsMap.hasOwnProperty(order.to)) {
                clientsSplitsMap[order.to].push(...order.shippingSplits);
            }
        });
        return clientsSplitsMap;
    }
);

export const selectSplitsToShippedQuantityMap = createSelector(
    selectAllActiveSplits,
    selectAllShipments,
    (splits, shipments) => {
        const resultMap = splits.reduce((map, split) => {
            map[split._id] = 0;
            return map;
        }, {});
        shipments.forEach(shipment =>
            shipment.items.forEach(item => {
                if (item.split && resultMap.hasOwnProperty(item.split))
                    resultMap[item.split] += item.quantity;
            })
        );
        return resultMap;
    }
);

export const selectShipmentOrders = createSelector(
    selectShipmentById,
    selectActiveOrdersMap,
    (shipment, ordersMap) => {
        if (!shipment || Object.keys(ordersMap).length === 0) return [];
        const shipmentOrdersMap = shipment.items.reduce((map, item) => {
            if (item.order && !map.hasOwnProperty(item.order)) map[item.order] = ordersMap[item.order];
            return map;
        }, {});
        return Object.values(shipmentOrdersMap);
    }
);