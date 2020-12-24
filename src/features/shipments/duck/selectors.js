import { shipmentsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import {
    selectAllActiveAndUnarchivedOrders,
    selectAllActiveOrders,
    selectOrdersMap
} from '../../orders/duck/selectors.js';
import {
    selectCountriesMap,
    selectCurrenciesMap,
    selectDeliveryMethodsMap,
    selectDocumentTypesMap,
    selectItemUnitsMap,
    selectMeasurementUnitsMap,
    selectPackageUnitsMap,
    selectShipmentStatusesMap,
    selectWeightUnitsMap
} from '../../../app/duck/selectors.js';
import { selectCompanyAddresses, selectCurrentCompany } from 'features/home/duck/home/selectors.js';
import { selectAllActiveClients, selectClientsMap } from '../../clients/duck/selectors.js';
import { getOptionId } from '../../../app/utils/options/getters.js';

export const {
    selectAll,
    selectById,
    selectEntities
} = shipmentsAdapter.getSelectors(state => state.shipments);

export const selectShipmentStatus = state => state.shipments.status;
export const selectShipmentDataStatus = state => state.shipments.dataStatus;
export const selectShipmentError = state => state.shipments.error;
export const selectCurrentShipmentId = state => state.shipments.currentShipmentId;

export const selectAllShipments = createSelector(
    selectAll,
    selectCountriesMap,
    selectDeliveryMethodsMap,
    selectCurrenciesMap,
    selectMeasurementUnitsMap,
    selectWeightUnitsMap,
    selectItemUnitsMap,
    selectPackageUnitsMap,
    selectShipmentStatusesMap,
    selectDocumentTypesMap,
    (shipments, countriesMap, deliveryMethodsMap, currenciesMap,
     measurementUnitsMap, weightUnitsMap, itemUnitsMap, packageUnitsMap,
     shipmentStatusesMap, documentTypesMap) => shipments.map(shipment => ({
        ...shipment,
        sellerAdd: { ...shipment.sellerAdd, country: countriesMap[shipment.sellerAdd.country] },
        consigneeAdd: { ...shipment.consigneeAdd, country: countriesMap[shipment.consigneeAdd.country] },
        shipAdd: { ...shipment.shipAdd, country: countriesMap[shipment.shipAdd?.country] },
        del: deliveryMethodsMap[shipment.del],
        currency: currenciesMap[shipment.currency],
        measurementUnit: measurementUnitsMap[shipment.measurementUnit],
        weightUnit: weightUnitsMap[shipment.weightUnit],
        status: shipmentStatusesMap[shipment.status],
        coo: countriesMap[shipment.coo],
        items: shipment.items.map(item => ({
            ...item,
            unit: itemUnitsMap[item.unit],
            pUnit: packageUnitsMap[item.pUnit],
            coo: countriesMap[item.coo],
            fdc: countriesMap[item.fdc],
            dop: countriesMap[item.dop]
        })),
        documents: shipment.documents.map(document => ({
                ...document,
                type: documentTypesMap[document.type]
            })
        )
    }))
);

export const selectShipmentsMap = createSelector(
    selectAllShipments,
    shipments => shipments.reduce((map, shipment) => {
        map[shipment._id] = shipment;
        return map;
    }, {})
);

export const selectShipmentById = createSelector(
    selectShipmentsMap,
    (_, { shipmentId }) => shipmentId,
    (shipmentsMap, shipmentId) => shipmentsMap[shipmentId]
);

export const selectShipmentOwnerById = createSelector(
    selectShipmentById,
    shipment => shipment?.createdBy
);

export const selectShipmentOrders = createSelector(
    selectShipmentById,
    selectOrdersMap,
    (shipment, ordersMap) => {
        if (!shipment || Object.keys(ordersMap).length === 0) return [];
        const shipmentOrdersMap = shipment.items.reduce((map, item) => {
            if (item.order && !map.hasOwnProperty(item.order)) map[item.order] = ordersMap[item.order];
            return map;
        }, {});
        return Object.values(shipmentOrdersMap);
    }
);

export const selectShipmentDocuments = createSelector(
    selectShipmentById,
    shipment => shipment.documents
);

export const selectShipmentCommercialInvoices = createSelector(
    selectShipmentDocuments,
    documents => documents
        .filter(doc => getOptionId(doc.type) === 'CI')
        .map(doc => doc.ref)
);

export const selectShipmentSalesContractRefs = createSelector(
    selectShipmentDocuments,
    documents => documents
        .filter(doc => getOptionId(doc.type) === 'SC')
        .map(doc => doc.ref)
);

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
                    resultMap[item.order].push({ shipment: shipment._id, quantity: item.quantity });
            })
        );
        return resultMap;
    }
);

export const selectEditShipmentShellById = createSelector(
    selectShipmentById,
    selectCompanyAddresses,
    selectClientsMap,
    (shipment, companyAddresses, clientsMap) => {
        if (!shipment) return null;
        const consignee = clientsMap[shipment.consignee];
        return {
            ...shipment,
            sellerAdd: companyAddresses.find(a => a._id === shipment.sellerAdd.addressId),
            consignee: consignee,
            consigneeAdd: consignee.addresses.find(a => a._id === shipment.consigneeAdd.addressId)
        }
    }
);

export const selectPopulatedShipmentById = createSelector(
    selectShipmentById,
    selectCompanyAddresses,
    selectClientsMap,
    selectCurrentCompany,
    (shipment, companyAddresses, clientsMap, company) => {
        const consignee = clientsMap[shipment.consignee];
        return {
            ...shipment,
            seller: company,
            sellerAdd: companyAddresses.find(a => a._id === shipment.sellerAdd.addressId),
            consignee: consignee,
            consigneeAdd: consignee.addresses.find(a => a._id === shipment.consigneeAdd.addressId),
            shipAdd: consignee.addresses.find(a => a._id === shipment.shipAdd?.addressId),
        };
    }
);


export const selectShipmentShellClientIdToActiveOrdersMap = createSelector(
    selectAllActiveAndUnarchivedOrders,
    selectAllActiveClients,
    (orders, clients) => {
        const clientsToOrdersMap = clients.reduce((map, client) => {
            map[client._id] = [];
            return map;
        }, {});
        orders.forEach(order => {
            const enhancedOrder = { ...order, selected: false };
            if (clientsToOrdersMap.hasOwnProperty(enhancedOrder.to))
                clientsToOrdersMap[enhancedOrder.to].push(enhancedOrder);
        });
        return clientsToOrdersMap;
    }
);