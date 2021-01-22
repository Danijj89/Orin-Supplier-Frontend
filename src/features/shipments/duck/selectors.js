import { shipmentsAdapter } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';
import {
    selectBillOfLandingTypesMap,
    selectCountriesMap,
    selectCurrenciesMap,
    selectDeliveryMethodsMap,
    selectDocumentTypesMap,
    selectItemUnitsMap,
    selectMeasurementUnitsMap,
    selectPackageUnitsMap,
    selectShipmentStatusesMap,
    selectWeightUnitsMap
} from 'app/duck/selectors.js';
import { selectCompanyAddresses, selectCurrentCompany } from 'features/home/duck/home/selectors.js';
import { selectClientsMap } from '../../clients/duck/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';

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
    selectBillOfLandingTypesMap,
    (shipments, countriesMap, deliveryMethodsMap, currenciesMap,
     measurementUnitsMap, weightUnitsMap, itemUnitsMap, packageUnitsMap,
     shipmentStatusesMap, documentTypesMap, billOfLandingTypesMap) => shipments.map(shipment => ({
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
        bolType: billOfLandingTypesMap[shipment.bolType],
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
