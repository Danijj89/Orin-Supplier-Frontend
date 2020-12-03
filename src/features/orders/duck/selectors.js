import { ordersAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import {
    selectCompanyDefaultAddress,
    selectCurrentCompany
} from '../../home/duck/selectors.js';
import {
    selectCountriesMap,
    selectCurrencies,
    selectCurrenciesMap,
    selectCurrentUserId, selectDefaultRowItem,
    selectDeliveryMethods, selectDeliveryMethodsMap, selectItemUnits, selectItemUnitsMap, selectOrderStatusesMap
} from '../../../app/duck/selectors.js';
import { getOptionId } from '../../../app/utils/options/getters.js';


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

export const selectOrdersMap = createSelector(
    selectEntities,
    selectDeliveryMethodsMap,
    selectOrderStatusesMap,
    selectCurrenciesMap,
    selectItemUnitsMap,
    selectCountriesMap,
    (ordersMap, deliveryMethodsMap, orderStatusesMap,
     currenciesMap, itemUnitsMap, countriesMap) =>
        Object.entries(ordersMap).reduce((map, [id, order]) => {
            map[id] = {
                ...order,
                fromAdd: { ...order.fromAdd, country: countriesMap[order.fromAdd.country]},
                toAdd: { ...order.toAdd, country: countriesMap[order.toAdd.country]},
                shipAdd: { ...order.shipAdd, country: countriesMap[order.shipAdd?.country]},
                del: deliveryMethodsMap[order.del],
                currency: currenciesMap[order.currency],
                status: Object.entries(order.status).reduce((obj, [key, status]) => {
                    obj[key] = { ...status, status: orderStatusesMap[status.status] };
                    return obj;
                }, {}),
                items: order.items.map(item => ({
                    ...item,
                    unit: itemUnitsMap[item.unit]
                }))
            }
            return map;
        }, {})
);

export const selectAllOrders = createSelector(
    selectOrdersMap,
    (ordersMap) => Object.values(ordersMap)
);

export const selectOrderById = createSelector(
    selectOrdersMap,
    (_, { orderId }) => orderId,
    (ordersMap, orderId) => ordersMap[orderId]
);

export const selectAllActiveOrders = createSelector(
    selectAllOrders,
    orders => orders.filter(order => order.active)
);


export const selectNewOrder = createSelector(
    selectCurrentCompany,
    selectCompanyDefaultAddress,
    selectDeliveryMethods,
    selectCurrencies,
    selectItemUnits,
    selectCurrentUserId,
    selectDefaultRowItem,
    (company, companyDefaultAddress, deliveryMethods, currencies, itemUnits, userId, defaultRowItem) => ({
        from: company._id,
        fromAdd: companyDefaultAddress,
        date: Date.now(),
        del: deliveryMethods[0],
        currency: company.currency || currencies[0] ,
        totalQ: { [getOptionId(itemUnits[0])]: 0 },
        totalA: 0,
        createdBy: userId,
        saveItems: false,
        autoGenerateRef: false,
        items: [defaultRowItem]
    })
);

export const selectOrderStatusField = createSelector(
    selectOrderById,
    order => order.status
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



