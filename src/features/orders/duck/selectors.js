import { ordersAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import {
    selectCountriesMap,
    selectCurrenciesMap,
    selectDeliveryMethodsMap,
    selectItemUnitsMap,
    selectOrderStatusesMap
} from 'app/duck/selectors.js';


export const {
    selectAll,
    selectById,
    selectEntities
} = ordersAdapter.getSelectors(state => state.orders);

export const selectOrderDataStatus = state => state.orders.dataStatus;
export const selectOrderStatus = state => state.orders.status;
export const selectOrderError = state => state.orders.error;
export const selectCurrentOrderId = state => state.orders.currentOrderId;
export const selectOrderShipmentIdsField = (state, id) => state.orders.entities[id]?.shipmentIds;

export const selectAllOrders = createSelector(
    selectAll,
    selectDeliveryMethodsMap,
    selectOrderStatusesMap,
    selectCurrenciesMap,
    selectItemUnitsMap,
    selectCountriesMap,
    (orders, deliveryMethodsMap, orderStatusesMap,
     currenciesMap, itemUnitsMap, countriesMap) => orders.map(order => {
         const items = order.items.map(item => ({
             ...item,
             unit: itemUnitsMap[item.unit]
         }));
         return {
            ...order,
            fromAdd: { ...order.fromAdd, country: countriesMap[order.fromAdd.country]},
            toAdd: { ...order.toAdd, country: countriesMap[order.toAdd.country]},
            shipAdd: { ...order.shipAdd, country: countriesMap[order.shipAdd?.country]},
            del: deliveryMethodsMap[order.del],
            currency: currenciesMap[order.currency],
            shippingSplits: order.shippingSplits.map(split => ({
                ...split,
                procurement: { ...split.procurement, status: orderStatusesMap[split.procurement.status] },
                production: { ...split.production, status: orderStatusesMap[split.production.status] },
                qa: { ...split.qa, status: orderStatusesMap[split.qa.status] },
                items: split.items.map(item => {
                    const orderItem = items.find(orderItem => orderItem._id === item._id);
                    return {
                        ...orderItem,
                        ...item,
                    };
                })
            })),
            items
        };
    })
);

export const selectOrdersMap = createSelector(
    selectAllOrders,
    orders =>
        orders.reduce((map, order) => {
            map[order._id] = order;
            return map;
        }, {})
);

export const selectOrderById = createSelector(
    selectOrdersMap,
    (_, { orderId }) => orderId,
    (ordersMap, orderId) => ordersMap[orderId]
);

export const selectOrderOwnerById = createSelector(
    selectOrderById,
    order => order?.createdBy
);

export const selectAllActiveAndUnarchivedOrders = createSelector(
    selectAllOrders,
    orders => orders.filter(order => order.active && !order.archived)
);

export const selectAllActiveOrders = createSelector(
    selectAllOrders,
    orders => orders.filter(order => order.active)
);

export const selectActiveOrdersMap = createSelector(
    selectAllActiveOrders,
    orders => orders.reduce((map, order) => {
        map[order._id] = order;
        return map;
    }, {})
);
















