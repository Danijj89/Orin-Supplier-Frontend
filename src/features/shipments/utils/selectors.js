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
        if (!shipment) return [];
        return shipment.items.reduce((arr, item) => {
            if (item.order && item.split && !arr.find(order => order.split._id === item.split)) {
                const order = { ...ordersMap[item.order] };
                order.split = order.shippingSplits.find(split => split._id === item.split);
                arr.push(order);
            }
            return arr;
        }, [])
    }
);