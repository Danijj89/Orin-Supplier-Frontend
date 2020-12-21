import { ordersAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import { selectCompanyDefaultAddress, selectCurrentCompany } from '../../home/duck/selectors.js';
import {
    selectCountriesMap,
    selectCurrencies,
    selectCurrenciesMap,
    selectSessionUserId,
    selectDefaultRowItem,
    selectDeliveryMethods,
    selectDeliveryMethodsMap,
    selectItemUnits,
    selectItemUnitsMap,
    selectOrderStatusesMap
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

export const selectAllOrders = createSelector(
    selectAll,
    selectDeliveryMethodsMap,
    selectOrderStatusesMap,
    selectCurrenciesMap,
    selectItemUnitsMap,
    selectCountriesMap,
    (orders, deliveryMethodsMap, orderStatusesMap,
     currenciesMap, itemUnitsMap, countriesMap) => orders.map(order => ({
        ...order,
        fromAdd: { ...order.fromAdd, country: countriesMap[order.fromAdd.country]},
        toAdd: { ...order.toAdd, country: countriesMap[order.toAdd.country]},
        shipAdd: { ...order.shipAdd, country: countriesMap[order.shipAdd?.country]},
        del: deliveryMethodsMap[order.del],
        currency: currenciesMap[order.currency],
        procurement: { ...order.procurement, status: orderStatusesMap[order.procurement.status] },
        production: { ...order.production, status: orderStatusesMap[order.production.status] },
        qa: { ...order.qa, status: orderStatusesMap[order.qa.status] },
        items: order.items.map(item => ({
            ...item,
            unit: itemUnitsMap[item.unit]
        }))
    }))
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

export const selectNewOrder = createSelector(
    selectCurrentCompany,
    selectCompanyDefaultAddress,
    selectDeliveryMethods,
    selectCurrencies,
    selectItemUnits,
    selectSessionUserId,
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
















